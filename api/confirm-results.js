import { getDb } from "./_lib/mongodb.js";

function buildPreviousPickNamesLowerExpression() {
  return {
    $map: {
      input: { $ifNull: ["$previousPicks", []] },
      as: "pick",
      in: {
        $toLower: {
          $trim: {
            input: {
              $cond: [
                { $eq: [{ $type: "$$pick" }, "string"] },
                "$$pick",
                { $ifNull: ["$$pick.name", ""] },
              ],
            },
          },
        },
      },
    },
  };
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const db = await getDb();
    const teamsCollection = db.collection("teams");
    const entriesCollection = db.collection("entries");

    const loserTeamDocs = await teamsCollection
      .find(
        { status: "loser" },
        {
          projection: { name: 1 },
        }
      )
      .toArray();
    const winnerTeamDocs = await teamsCollection
      .find(
        { status: "winner" },
        {
          projection: { name: 1 },
        }
      )
      .toArray();

    const loserNamesLower = loserTeamDocs
      .map((team) => String(team.name || "").trim().toLowerCase())
      .filter(Boolean);
    const winnerNamesLower = winnerTeamDocs
      .map((team) => String(team.name || "").trim().toLowerCase())
      .filter(Boolean);

    await entriesCollection.updateMany(
      {
        isAlive: true,
        currentPick: { $ne: null },
      },
      [
        {
          $set: {
            previousPicks: {
              $concatArrays: [{ $ifNull: ["$previousPicks", []] }, ["$currentPick"]],
            },
            currentPick: null,
            currentPickUpdatedAt: new Date(),
          },
        },
      ]
    );

    if (winnerNamesLower.length === 0 && loserNamesLower.length === 0) {
      return res.status(200).json({
        ok: true,
        eliminatedCount: 0,
        winnerTeamsCount: 0,
        loserTeamsCount: 0,
      });
    }

    const candidates = await entriesCollection
      .aggregate([
        {
          $project: {
            isAlive: 1,
            previousPickNamesLower: buildPreviousPickNamesLowerExpression(),
          },
        },
        {
          $project: {
            isAlive: 1,
            latestPreviousPickName: { $arrayElemAt: ["$previousPickNamesLower", -1] },
          },
        },
        {
          $match: {
            isAlive: true,
            $expr: {
              $or: [
                { $eq: ["$latestPreviousPickName", null] },
                { $eq: ["$latestPreviousPickName", ""] },
                { $not: [{ $in: ["$latestPreviousPickName", winnerNamesLower] }] },
              ],
            },
          },
        },
        {
          $project: { _id: 1 },
        },
      ])
      .toArray();

    const idsToEliminate = candidates.map((doc) => doc._id);

    if (idsToEliminate.length === 0) {
      return res.status(200).json({
        ok: true,
        eliminatedCount: 0,
        winnerTeamsCount: winnerNamesLower.length,
        loserTeamsCount: loserNamesLower.length,
      });
    }

    const updateResult = await entriesCollection.updateMany(
      { _id: { $in: idsToEliminate } },
      {
        $set: {
          isAlive: false,
          isAliveUpdatedAt: new Date(),
        },
      }
    );

    return res.status(200).json({
      ok: true,
      eliminatedCount: updateResult.modifiedCount,
      winnerTeamsCount: winnerNamesLower.length,
      loserTeamsCount: loserNamesLower.length,
    });
  } catch (error) {
    console.error("/api/confirm-results failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
