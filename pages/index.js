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
    const res = await fetch("/api/save-selections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selections)
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

