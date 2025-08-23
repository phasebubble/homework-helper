import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomeworkHelper() {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("General");
  const [depth, setDepth] = useState("step");
  const [hintsOnly, setHintsOnly] = useState(false);
  const [showFinalAnswer, setShowFinalAnswer] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const explainQuestion = async () => {
    setLoading(true);

    // Simulated explanation output for demo purposes
    let steps = [
      "Step 1: Identify the problem.",
      "Step 2: Break it into smaller parts.",
      "Step 3: Apply relevant formulas/logic.",
      "Step 4: Simplify the result.",
    ];
    let finalAnswer = "42 (example final answer)";

    let output = steps.join("\n");

    if (!hintsOnly && showFinalAnswer) {
      output += `\n\nFINAL ANSWER: ${finalAnswer}`;
    }

    setTimeout(() => {
      setResponse(output);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center"
        >
          Homework Helper
        </motion.h1>

        <Card className="p-4 shadow-lg rounded-2xl">
          <textarea
            className="w-full p-3 border rounded-lg"
            rows="4"
            placeholder="Paste your homework question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            <select
              className="p-2 border rounded-lg"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option>General</option>
              <option>Math</option>
              <option>Science</option>
              <option>History</option>
              <option>English</option>
            </select>
            <select
              className="p-2 border rounded-lg"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            >
              <option value="step">Step-by-step</option>
              <option value="simple">Simple</option>
              <option value="detailed">Detailed</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hintsOnly}
                onChange={() => setHintsOnly(!hintsOnly)}
              />
              Hints only
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showFinalAnswer}
                onChange={() => setShowFinalAnswer(!showFinalAnswer)}
              />
              Show final answer
            </label>
            <Button onClick={explainQuestion} disabled={loading}>
              {loading ? "Thinking..." : "Explain"}
            </Button>
          </div>
        </Card>

        {response && (
          <Card className="p-4 bg-white shadow-lg rounded-2xl border-t-4 border-green-400">
            <CardContent>
              <pre className="whitespace-pre-wrap text-gray-800 font-mono">
                {response}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
