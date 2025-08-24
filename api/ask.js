import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this matches your Vercel variable
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "No question provided" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    const answer = completion.choices[0].message?.content?.trim();

    if (!answer) {
      return res.status(500).json({ error: "No answer received from AI" });
    }

    res.status(200).json({ answer });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
}
