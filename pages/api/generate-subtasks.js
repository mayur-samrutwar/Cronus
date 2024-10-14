import OpenAI from "openai";

export default async function handler(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { projectDescription } = req.body;

  if (!projectDescription) {
    return res.status(400).json({ error: "Project description is required." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates project subtasks." },
        { role: "user", content: `Generate an array of tech stack needed(not the features), like frontend, backend, whichever is needed(they should not be repeatable) in serial manner for the following project description: ${projectDescription}. Just generate the list of stack and no other information and the total count should be less than 10.` }
      ],
      max_tokens: 500,
    });

    const subtasks = completion.choices[0].message.content
      .trim()
      .split('\n')
      .map(task => task.trim())
      .filter(task => task.length > 0);

    res.status(200).json({ data: subtasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while generating subtasks." });
  }
}
