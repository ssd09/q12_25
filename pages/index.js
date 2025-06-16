import { useState } from "react";

const questions = [
  "I know what is expected of me at work.",
  "I have the materials and equipment I need to do my work right.",
  "At work, I have the opportunity to do what I do best every day.",
  "In the last seven days, I have received recognition or praise for doing good work.",
  "My supervisor, or someone at work, seems to care about me as a person."
];

export default function Home() {
  const [selections, setSelections] = useState({});

  const handlePriorityChange = (question, priority) => {
    setSelections((prev) => ({
      ...prev,
      [question]: priority
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyMbBzq_r3PE2rLhAa4zfLKnEe_ou82JpZQ6rm25mDIr55aJvH7RNejYk7gzbPKb48G/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "q1": { "answer": "No", "priority": 2 },
        q2: { answer: "No", priority: 1 } 
      })
    });

    if (res.ok) alert("Responses saved!");
    else alert("Error saving responses.");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Q12 Priority Survey</h1>
      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <strong>{q}</strong>
          <br />
          Priority:
          <select
            value={selections[q] || ""}
            onChange={(e) => handlePriorityChange(q, parseInt(e.target.value))}
          >
            <option value="">Select</option>
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

