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

async function syncUserTotalEntries(db, username) {
  const entriesCollection = db.collection("entries");
  const loginsCollection = db.collection("logins");
  const totalEntries = await entriesCollection.countDocuments({ username });

  await loginsCollection.updateMany(
    { username },
    {
      $set: {
        totalEntries,
        totalEntriesUpdatedAt: new Date(),
      },
    }
  );
}

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const entriesCollection = db.collection("entries");
    const settingsCollection = db.collection("appSettings");
    const settingsDoc = await settingsCollection.findOne(
      { _id: "global" },
      { projection: { entriesLocked: 1 } }
    );
    const entriesLocked = Boolean(settingsDoc?.entriesLocked);

    if (req.method === "GET") {
      const username = String(req.query?.username || "").trim();

      if (!username) {
        return res.status(400).json({ error: "username is required" });
      }

      const entries = await entriesCollection
        .find({ username }, { projection: { username: 1, entryNumber: 1, isLocked: 1, createdAt: 1 } })
        .sort({ entryNumber: 1 })
        .toArray();

      return res.status(200).json({
        entriesLocked,
        entries: entries.map((entry) => ({
          id: String(entry._id),
          username: entry.username,
          entryNumber: entry.entryNumber,
          isLocked: Boolean(entry.isLocked),
          createdAt: entry.createdAt,
        })),
      });
    }

    if (req.method === "POST") {
      const { username } = readJsonBody(req);
      const cleanUsername = String(username || "").trim();

      if (!cleanUsername) {
        return res.status(400).json({ error: "username is required" });
      }

      if (entriesLocked) {
        return res.status(403).json({ error: "entries are locked; cannot create new entry" });
      }

      const existingEntries = await entriesCollection
        .find({ username: cleanUsername }, { projection: { entryNumber: 1 } })
        .sort({ entryNumber: 1 })
        .toArray();

      let nextEntryNumber = 1;
      for (const entry of existingEntries) {
        if (entry.entryNumber === nextEntryNumber) {
          nextEntryNumber += 1;
        } else if (entry.entryNumber > nextEntryNumber) {
          break;
        }
      }

      const created = {
        username: cleanUsername,
        entryNumber: nextEntryNumber,
        isLocked: false,
        createdAt: new Date(),
      };

      const result = await entriesCollection.insertOne(created);
      await syncUserTotalEntries(db, cleanUsername);

      return res.status(201).json({
        entry: {
          id: String(result.insertedId),
          username: created.username,
          entryNumber: created.entryNumber,
          isLocked: created.isLocked,
          createdAt: created.createdAt,
        },
      });
    }

    if (req.method === "DELETE") {
      const id = String(req.query?.id || "").trim();
      const username = String(req.query?.username || "").trim();

      if (!id || !username) {
        return res.status(400).json({ error: "id and username are required" });
      }

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "invalid id" });
      }

      if (entriesLocked) {
        return res.status(403).json({ error: "entries are locked and cannot be deleted" });
      }

      const existing = await entriesCollection.findOne(
        { _id: new ObjectId(id), username },
        { projection: { isLocked: 1 } }
      );

      if (!existing) {
        return res.status(404).json({ error: "entry not found" });
      }

      if (existing.isLocked) {
        return res.status(403).json({ error: "entry is locked and cannot be deleted" });
      }

      const result = await entriesCollection.deleteOne({ _id: new ObjectId(id), username });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "entry not found" });
      }

      await syncUserTotalEntries(db, username);

      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET,POST,DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("/api/entries failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
