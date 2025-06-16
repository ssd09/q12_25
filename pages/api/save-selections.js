import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { selections } = req.body;
  if (!Array.isArray(selections)) {
    res.status(400).json({ error: 'Invalid data' });
    return;
  }

  const filePath = path.join(process.cwd(), 'data', 'selections.json');
  let prev = [];
  try {
    if (fs.existsSync(filePath)) {
      prev = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {}

  // Save new selections (append for demo; in real app, store per user)
  const updated = [...prev, { timestamp: Date.now(), selections }];
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

  res.status(200).json({ success: true });
}