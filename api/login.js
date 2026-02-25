import bcrypt from "bcryptjs";
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

function normalizeUsername(value) {
  return String(value || "").trim().toLowerCase();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildUsernameMatch(rawUsername) {
  const usernameLower = normalizeUsername(rawUsername);
  return {
    usernameLower,
    match: {
      $or: [
        { usernameLower },
        { username: new RegExp(`^${escapeRegex(usernameLower)}$`, "i") },
      ],
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { username, email, password } = readJsonBody(req);
    const cleanUsername = String(username || "").trim();
    const cleanEmail = String(email || "").trim();
    const { usernameLower, match } = buildUsernameMatch(cleanUsername);

    if (!cleanUsername || !cleanEmail || !password) {
      return res.status(400).json({ error: "username, email, and password are required" });
    }

    const db = await getDb();
    const existingUserByUsername = await db.collection("logins").findOne(match, { projection: { _id: 1 } });

    if (existingUserByUsername) {
      return res.status(409).json({ error: "username already exists" });
    }

    const existingUserByEmail = await db.collection("logins").findOne(
      { email: cleanEmail },
      { projection: { _id: 1 } }
    );

    if (existingUserByEmail) {
      return res.status(409).json({ error: "email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.collection("logins").insertOne({
      username: cleanUsername,
      usernameLower,
      email: cleanEmail,
      passwordHash,
      totalEntries: 0,
      createdAt: new Date(),
    });

    return res.status(201).json({
      ok: true,
      id: String(result.insertedId),
    });
  } catch (error) {
    console.error("/api/login failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
