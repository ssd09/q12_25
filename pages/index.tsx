import React, { useState } from 'react';

const QUESTIONS = [
  "Q1: What is your most important goal this year?",
  "Q2: Which skill would you most like to improve?",
  "Q3: What is your biggest challenge right now?",
  "Q4: What motivates you to achieve your goals?",
  "Q5: How do you measure personal success?",
];

type Selection = {
  question: string;
  priority: number;
};

export default function Home() {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [saved, setSaved] = useState(false);

  const handlePriorityChange = (q: string, prio: number) => {
    setSelections((prev) => {
      const exists = prev.find((s) => s.question === q);
      if (exists) {
        return prev.map((s) =>
          s.question === q ? { ...s, priority: prio } : s
        );
      } else {
        return [...prev, { question: q, priority: prio }];
      }
    });
    setSaved(false);
  };

  const handleChecked = (q: string, checked: boolean) => {
    setSelections((prev) => {
      if (!checked) {
        return prev.filter((s) => s.question !== q);
      } else {
        return [...prev, { question: q, priority: 1 }];
      }
    });
    setSaved(false);
  };

  const handleSave = () => {
    const toSave = selections
      .sort((a, b) => a.priority - b.priority)
      .map((s) => `${s.priority}. ${s.question}`)
      .join('\n');
    const blob = new Blob([toSave], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'q12_selections.txt';
    a.click();
    setSaved(true);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Q12 Questions - Select & Prioritize</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {QUESTIONS.map((q, idx) => {
            const selected = selections.find((s) => s.question === q);
            return (
              <li key={idx} style={{ marginBottom: 20 }}>
                <label>
                  <input
                    type="checkbox"
                    checked={!!selected}
                    onChange={(e) =>
                      handleChecked(q, e.target.checked)
                    }
                  />
                  <span style={{ marginLeft: 8 }}>{q}</span>
                </label>
                {selected && (
                  <select
                    value={selected.priority}
                    onChange={(e) =>
                      handlePriorityChange(q, Number(e.target.value))
                    }
                    style={{ marginLeft: 16 }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        Priority {n}
                      </option>
                    ))}
                  </select>
                )}
              </li>
            );
          })}
        </ul>
        <button type="submit" style={{ padding: '8px 20px', fontSize: 16 }}>
          Save Selections
        </button>
        {saved && <span style={{ marginLeft: 16, color: 'green' }}>Saved!</span>}
      </form>
      <p style={{ color: '#666', marginTop: 40 }}>
        Downloaded file contains your selected questions and their priorities.
      </p>
    </div>
  );
}