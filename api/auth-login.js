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
    const { username, password } = readJsonBody(req);

    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    const db = await getDb();
    const { match } = buildUsernameMatch(username);
    const user = await db.collection("logins").findOne(
      match,
      { projection: { username: 1, passwordHash: 1 } }
    );

    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.status(200).json({ ok: true, username: user.username });
  } catch (error) {
    console.error("/api/auth-login failed", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
