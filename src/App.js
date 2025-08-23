import React, { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setAnswer("Please type a question first!");
    } else {
      setAnswer(`You asked: "${question}". Here's where the answer will appear.`);
    }
  };

  return (
    <div className="app-container">
      <h1>Homework Helper</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">Get Answer</button>
      </form>
      {answer && <div className="answer-box">{answer}</div>}
    </div>
  );
}

export default App;
