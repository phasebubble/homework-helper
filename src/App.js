import React, { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();

    if (!question.trim()) {
      setAnswer("⚠️ Please type a question first!");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      if (data.answer) {
        setAnswer(data.answer);
      } else {
        setAnswer("❌ No answer received.");
      }
    } catch (err) {
      console.error(err);
      setAnswer("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Homework Helper</h1>
      <form onSubmit={handleAsk} className="form-container">
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Get Answer</button>
      </form>
      {loading && <div className="answer-box">⏳ Loading...</div>}
      {answer && !loading && <div className="answer-box">{answer}</div>}
    </div>
  );
}

export default App;
