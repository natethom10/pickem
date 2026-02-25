import { getDb } from "./_lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
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
