const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  analyzeRepo
} = require("../Controllers/repocontroller");

router.post(
  "/analyze-repo",
  auth,
  analyzeRepo
);

module.exports = router;