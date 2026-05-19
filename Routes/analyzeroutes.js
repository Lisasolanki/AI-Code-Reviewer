const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  analyzeCode,
  getHistory
} = require("../Controllers/analyzecontroller");

router.post(
  "/analyze-code",
  auth,
  analyzeCode
);

module.exports = router;