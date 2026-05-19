const { analyzeCodeWithAI } = require("../Services/AIservice");
const { extractJSON, normalizeResponse } = require("../utils/parseResponse.js");
const Analysis = require("../models/Analysis");

exports.analyzeCode = async (req, res) => {

  try {

    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({
        error: "code is required"
      });
    }

    const aiResponse = await analyzeCodeWithAI(code, language);

    const parsed = extractJSON(aiResponse);

    if (!parsed) {
      return res.status(500).json({
        error: "Invalid AI response"
      });
    }

    const cleanData = normalizeResponse(parsed);

    // ✅ SAVE TO DATABASE
    await Analysis.create({
      userId: req.user.id,
      repoUrl: null,
      codeSnippet: code,
      result: cleanData
    });

    res.json(cleanData);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Server error"
    });
  }
};

exports.getHistory = async (req, res) => {

  try {

    const history = await Analysis.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching history"
    });
  }
};