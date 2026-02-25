import { getDb } from "./_lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const db = await getDb();
    const users = await db
      .collection("logins")
      .find({}, { projection: { username: 1, email: 1, passwordHash: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray();

    return res.status(200).json({
      users: users.map((user) => ({
        id: String(user._id),
        username: user.username,
        email: user.email,
        password: user.passwordHash,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    console.error("/api/users failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
