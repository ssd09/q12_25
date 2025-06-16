export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end("Only POST allowed");

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyBqnwxC4_-pdKPC6emTn0-NaY_2pbzZg-tdjmxvELwkeZtKe7zDt6roXsDTO8p_TLK/exec", {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const text = await response.text();
    return res.status(200).json({ message: text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to submit to Google Sheets" });
  }
}
