import OpenAI from "openai";

export default async function handler(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { projectDescription, techStackExpertise, hoursPerWeek, bufferTime } = req.body;

  if (!projectDescription || !techStackExpertise || !hoursPerWeek || bufferTime === undefined) {
    return res.status(400).json({ error: "All parameters are required." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert project manager and software developer capable of estimating project timelines." },
        { role: "user", content: `
          Given the following project details, be realistic.
          
          Project Description: ${projectDescription}
          Tech Stack Expertise: ${JSON.stringify(techStackExpertise)}
          Working Hours per Week per Person: ${hoursPerWeek}
          Buffer Time: ${bufferTime} hours

          Please analyze the project complexity and the team's technical expertise to estimate the total time (in hours) required to complete this project. 
          Provide your estimate as a single number representing total hours, including the buffer time. Also consider that help form AI will reduce the number of hours. Just reply with the number, nothing else
        `}
      ],
      max_tokens: 100,
    });

    const estimatedHours = parseInt(completion.choices[0].message.content.trim());

    if (isNaN(estimatedHours)) {
      throw new Error("Failed to generate a valid estimate");
    }

    const totalEstimate = estimatedHours + parseInt(bufferTime);

    res.status(200).json({ estimatedHours: totalEstimate });
  } catch (error) {
    console.error('Error details:', error);
    if (error.response) {
      console.error('OpenAI API response:', error.response.data);
    }
    res.status(500).json({ error: "An error occurred while generating the estimate.", details: error.message });
  }
}
