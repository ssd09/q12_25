export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  try {
    const googleResponse = await fetch("https://script.google.com/macros/library/d/1SbAq3bRIb8vO1j8tHm3ttpnvOUrSdYZ-V06m5urkPA4LmdKoJIEUIKa3/4", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    })

    const result = await googleResponse.text();
    res.status(200).json({ success: true, response: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
