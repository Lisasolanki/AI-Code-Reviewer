const Analysis = require("../models/Analysis");

exports.getHistory = async (req, res) => {
  try {
    const data = await Analysis.find({
  userId: req.user.id
}).sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
};