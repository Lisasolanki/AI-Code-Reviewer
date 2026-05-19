const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

  try {

    console.log("HEADERS:", req.headers);

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("VERIFIED:", verified);

    req.user = verified;

    next();

  } catch (error) {

    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = auth;