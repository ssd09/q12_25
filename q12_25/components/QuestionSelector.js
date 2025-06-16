import { useState, useEffect } from 'react';

export default function QuestionSelector() {
  const [questions, setQuestions] = useState([]);
  const [selections, setSelections] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/data/questions.json')
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  const handleSelect = (qid, priority) => {
    setSelections(prev => ({
      ...prev,
      [qid]: priority
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage('');
    const selected = Object.entries(selections)
      .filter(([, pri]) => pri > 0)
      .map(([qid, pri]) => ({ qid, priority: pri }));
    const res = await fetch('/api/save-selections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selections: selected })
    });
    setSaving(false);
    if (res.ok) setMessage('Selections saved!');
    else setMessage('Error saving selections.');
  };

  return (
    <div>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <ul>
          {questions.map((q, idx) => (
            <li key={q.id} style={{ marginBottom: '1rem' }}>
              <div>
                <strong>{idx + 1}.</strong> {q.text}
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={selections[q.id] > 0}
                  onChange={e =>
                    handleSelect(q.id, e.target.checked ? 1 : 0)
                  }
                />
                Select
              </label>
              {selections[q.id] > 0 && (
                <span style={{ marginLeft: 10 }}>
                  Priority:
                  <select
                    value={selections[q.id]}
                    onChange={e => handleSelect(q.id, Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </span>
              )}
            </li>
          ))}
        </ul>
        <button type="submit" disabled={saving}>Save Selections</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}