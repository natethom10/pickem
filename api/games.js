import { ObjectId } from "mongodb";
import { getDb } from "./_lib/mongodb.js";

function normalizeTeam(team) {
  if (!team || typeof team !== "object") {
    return { name: "", seed: 0, logo: "", status: null };
  }

  return {
    name: String(team.name || "").trim(),
    seed: Number(team.seed || 0),
    logo: String(team.logo || "").trim(),
    status: typeof team.status === "string" ? team.status : null,
  };
}

function readJsonBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function escapeRegex(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function handler(req, res) {
  try {
    if (req.method === "PATCH") {
      const body = readJsonBody(req);
      const gameId = String(body.id || "").trim();
      const winnerSide = body.winnerSide === "A" || body.winnerSide === "B" ? body.winnerSide : null;
      const completed = typeof body.completed === "boolean" ? body.completed : winnerSide !== null;

      if (!gameId) {
        return res.status(400).json({ error: "id is required" });
      }

      const db = await getDb();
      const gamesCollection = db.collection("games");
      const teamsCollection = db.collection("teams");
      const selectors = [{ id: gameId }, { _id: gameId }];
      if (ObjectId.isValid(gameId)) {
        selectors.push({ _id: new ObjectId(gameId) });
      }

      const gameDoc = await gamesCollection.findOne(
        { $or: selectors },
        { projection: { teamA: 1, teamB: 1 } }
      );

      if (!gameDoc) {
        return res.status(404).json({ error: "game not found" });
      }

      const result = await gamesCollection.updateOne(
        { $or: selectors },
        {
          $set: {
            completed,
            winnerSide: completed ? winnerSide : null,
            updatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "game not found" });
      }

      const teamAName = String(gameDoc?.teamA?.name || "").trim();
      const teamBName = String(gameDoc?.teamB?.name || "").trim();

      if (teamAName && teamBName) {
        if (completed && winnerSide) {
          const winnerName = winnerSide === "A" ? teamAName : teamBName;
          const loserName = winnerSide === "A" ? teamBName : teamAName;

          await teamsCollection.updateOne(
            { name: new RegExp(`^${escapeRegex(winnerName)}$`, "i") },
            { $set: { status: "winner", updatedAt: new Date() } }
          );
          await teamsCollection.updateOne(
            { name: new RegExp(`^${escapeRegex(loserName)}$`, "i") },
            { $set: { status: "loser", updatedAt: new Date() } }
          );
        } else {
          await teamsCollection.updateOne(
            { name: new RegExp(`^${escapeRegex(teamAName)}$`, "i") },
            { $set: { status: null, updatedAt: new Date() } }
          );
          await teamsCollection.updateOne(
            { name: new RegExp(`^${escapeRegex(teamBName)}$`, "i") },
            { $set: { status: null, updatedAt: new Date() } }
          );
        }
      }

      return res.status(200).json({ ok: true, id: gameId, completed, winnerSide: completed ? winnerSide : null });
    }

    if (req.method !== "GET") {
      res.setHeader("Allow", "GET,PATCH");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const db = await getDb();
    const teamsCollection = db.collection("teams");
    const docs = await db
      .collection("games")
      .find(
        {},
        {
          projection: {
            id: 1,
            teamA: 1,
            teamB: 1,
            completed: 1,
            winnerSide: 1,
          },
        }
      )
      .toArray();
    const teamDocs = await teamsCollection
      .find({}, { projection: { name: 1, status: 1 } })
      .toArray();
    const teamStatusByName = new Map(
      teamDocs.map((team) => [String(team.name || "").trim().toLowerCase(), team.status || null])
    );

    const games = docs
      .map((doc) => {
        const idValue = String(doc.id || doc._id || "").trim();
        const teamA = normalizeTeam(doc.teamA);
        const teamB = normalizeTeam(doc.teamB);
        teamA.status = teamStatusByName.get(teamA.name.toLowerCase()) || null;
        teamB.status = teamStatusByName.get(teamB.name.toLowerCase()) || null;

        return {
          id: idValue,
          teamA,
          teamB,
          completed: Boolean(doc.completed),
          winnerSide: doc.winnerSide === "A" || doc.winnerSide === "B" ? doc.winnerSide : null,
        };
      })
      .filter((game) => game.id && game.teamA.name && game.teamB.name);

    return res.status(200).json({ games });
  } catch (error) {
    console.error("/api/games failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
