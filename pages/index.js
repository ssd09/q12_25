import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch the content of local file
    fetch("/q12_notes.txt")
      .then((res) => res.text())
      .then((text) => setNotes(text))
      .catch(() => setNotes("Failed to load notes."));
  }, []);

  const handleSend = async () => {
    if (!feedback.trim()) {
      setStatus("Please write something.");
      return;
    }

    setStatus("Sending...");

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyMbBzq_r3PE2rLhAa4zfLKnEe_ou82JpZQ6rm25mDIr55aJvH7RNejYk7gzbPKb48G/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback: feedback,
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        setStatus("Feedback saved ✅");
        setFeedback("");
      } else {
        setStatus("Error saving feedback: " + result.message);
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Q12 Team Discussion and Action Points</h1>
      <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "8px" }}>
        {notes}
      </pre>

      <h2 style={{ marginTop: "2rem" }}>Your Input</h2>
      <textarea
        rows="5"
        cols="60"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your comment or action point here..."
      />
      <br />
      <button onClick={handleSend} style={{ marginTop: "10px" }}>Send</button>
      <p>{status}</p>
    </div>
  );
}
