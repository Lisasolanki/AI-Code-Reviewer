const axios = require("axios");

async function analyzeCodeWithAI(code, language) {

  const prompt = `
You are a senior software engineer performing a professional code review.

Analyze the given ${language} code strictly.

SCORING RULES:
- 90-100 → Excellent
- 70-89 → Good
- 40-69 → Average
- 0-39 → Poor

IMPORTANT:
- If code is simple and correct, give score above 85
- Be consistent between score and feedback

RETURN ONLY JSON:

{
  "score": number,
  "issues": {
    "bugs": ["..."],
    "performance": ["..."],
    "bestPractices": ["..."]
  },
  "summary": "..."
}

Code:
${code}
`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = { analyzeCodeWithAI };