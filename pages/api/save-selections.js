import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "responses.json");

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const existing = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath))
    : [];

  existing.push({ timestamp: new Date().toISOString(), ...req.body });

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  res.status(200).json({ success: true });
}
