import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let question;

  try {
    // Handle both raw string and already-parsed JSON
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    question = body.question;
  } catch (err) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    res.status(200).json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to generate answer" });
  }
}
