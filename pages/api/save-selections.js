export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Only POST allowed");

  try {
    const googleResponse = await fetch("https://script.google.com/macros/s/AKfycbyMbBzq_r3PE2rLhAa4zfLKnEe_ou82JpZQ6rm25mDIr55aJvH7RNejYk7gzbPKb48G/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q1: { answer: "Yes", priority: 2 },
        q2: { answer: "No", priority: 1 },
        q3: { answer: "No", priority: 3 },
        q4: { answer: "No", priority: 4 },
        q5: { answer: "No", priority: 5 }
      }),
    });

    const result = await googleResponse.text();
    res.status(200).json({ success: true, response: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
