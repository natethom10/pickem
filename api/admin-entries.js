import { ObjectId } from "mongodb";
import { getDb } from "./_lib/mongodb.js";

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
      const { id, isPaid, usernameLower, markAllPaid } = readJsonBody(req);
      const cleanId = String(id || "").trim();
      const cleanUsernameLower = String(usernameLower || "").trim().toLowerCase();

      if (markAllPaid === true) {
        if (!cleanUsernameLower) {
          return res.status(400).json({ error: "usernameLower is required for markAllPaid" });
        }

        const db = await getDb();
        const usernameMatch = {
          $or: [
            { usernameLower: cleanUsernameLower },
            { username: new RegExp(`^${escapeRegex(cleanUsernameLower)}$`, "i") },
          ],
        };

        const result = await db.collection("entries").updateMany(usernameMatch, {
          $set: {
            isPaid: true,
            isPaidUpdatedAt: new Date(),
          },
        });

        return res.status(200).json({
          ok: true,
          usernameLower: cleanUsernameLower,
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
        });
      }

      if (!cleanId) {
        return res.status(400).json({ error: "id is required" });
      }

      if (!ObjectId.isValid(cleanId)) {
        return res.status(400).json({ error: "invalid id" });
      }

      if (typeof isPaid !== "boolean") {
        return res.status(400).json({ error: "isPaid must be a boolean" });
      }

      const db = await getDb();
      const result = await db.collection("entries").updateOne(
        { _id: new ObjectId(cleanId) },
        {
          $set: {
            isPaid,
            isPaidUpdatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "entry not found" });
      }

      return res.status(200).json({ ok: true, id: cleanId, isPaid });
    }

    if (req.method !== "GET") {
      res.setHeader("Allow", "GET,PATCH");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const db = await getDb();
    const entries = await db
      .collection("entries")
      .find(
        {},
        {
          projection: {
            username: 1,
            usernameLower: 1,
            entryNumber: 1,
            isAlive: 1,
            isPaid: 1,
            isLocked: 1,
            currentPick: 1,
            previousPicks: 1,
            createdAt: 1,
          },
        }
      )
      .toArray();
    const logins = await db
      .collection("logins")
      .find({}, { projection: { username: 1, usernameLower: 1, email: 1 } })
      .toArray();

    const usersByName = new Map();

    for (const login of logins) {
      const username = String(login.username || "").trim();
      const usernameLower = String(login.usernameLower || username).toLowerCase();
      if (!usernameLower) continue;

      usersByName.set(usernameLower, {
        username,
        usernameLower,
        email: String(login.email || ""),
        entries: [],
      });
    }

    for (const entry of entries) {
      const username = String(entry.username || "").trim();
      const usernameLower = String(entry.usernameLower || username).toLowerCase();
      if (!usernameLower) continue;

      if (!usersByName.has(usernameLower)) {
        usersByName.set(usernameLower, {
          username,
          usernameLower,
          email: "",
          entries: [],
        });
      }

      usersByName.get(usernameLower).entries.push({
        id: String(entry._id),
        entryNumber: Number(entry.entryNumber || 0),
        isAlive: entry.isAlive !== false,
        isPaid: Boolean(entry.isPaid),
        isLocked: Boolean(entry.isLocked),
        currentPick: entry.currentPick ?? null,
        previousPicks: Array.isArray(entry.previousPicks) ? entry.previousPicks : [],
        createdAt: entry.createdAt || null,
      });
    }

    const users = [...usersByName.values()]
      .map((user) => ({
        ...user,
        entries: user.entries.sort((a, b) => a.entryNumber - b.entryNumber),
      }))
      .sort((a, b) => a.usernameLower.localeCompare(b.usernameLower));

    return res.status(200).json({ users });
  } catch (error) {
    console.error("/api/admin-entries failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
