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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fullName, password } = readJsonBody(req);

    if (!fullName || !password) {
      return res.status(400).json({ error: "fullName and password are required" });
    }

    const db = await getDb();
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.collection("logins").insertOne({
      fullName,
      passwordHash,
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
