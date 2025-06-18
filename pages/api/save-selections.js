export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  try {
    const googleResponse = await fetch("https://script.google.com/macros/s/AKfycbyMbBzq_r3PE2rLhAa4zfLKnEe_ou82JpZQ6rm25mDIr55aJvH7RNejYk7gzbPKb48G/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: req.body,
    })

    const result = await googleResponse.text();
    res.status(200).json({ success: true, response: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
