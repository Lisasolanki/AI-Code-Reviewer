const { fetchRepoCode } = require("../Services/githubService");
const { analyzeCodeWithAI } = require("../Services/AIservice");
const Analysis = require("../models/Analysis");

// ✅ Helper function to clean AI response
const extractJSON = (text) => {
  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    return null;
  }
};

exports.analyzeRepo = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    console.log("STEP 1: Repo URL:", repoUrl);

    if (!repoUrl) {
      return res.status(400).json({ error: "Repo URL required" });
    }

    const code = await fetchRepoCode(repoUrl);

    console.log("STEP 2: Code fetched, length:", code.length);

    const aiResponse = await analyzeCodeWithAI(code, "javascript");

    console.log("STEP 3: AI raw response:", aiResponse);

    // ✅ FIXED PARSING
    const parsed = extractJSON(aiResponse);

    if (!parsed) {
      console.error("STEP 4: Invalid JSON:", aiResponse);
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    console.log("STEP 5: Parsed successfully");

    // ✅ SAVE TO DATABASE
    await Analysis.create({
      userId: req.user.id,
      repoUrl: repoUrl,
      codeSnippet: code,
      result: parsed
    });
    res.json(parsed);

  } catch (error) {
    console.error("FINAL ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};