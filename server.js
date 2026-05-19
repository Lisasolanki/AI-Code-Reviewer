const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./Config/db");
console.log(process.env.MONGO_URI);

// 👇 call BEFORE anything else
connectDB();

const app = express();
// ✅ 1. CORS FIRST
app.use(cors({
  origin: "http://localhost:5173"
}));

// ✅ 2. JSON PARSER
app.use(express.json());

// ✅ 3. ROUTES AFTER MIDDLEWARE
const reporoutes = require("./Routes/reporoutes");
const analyzeRoutes = require("./Routes/analyzeroutes");

app.use("/api", reporoutes);
app.use("/api", analyzeRoutes);

//History routes
const historyRoutes = require("./Routes/historyroutes");
app.use("/api", historyRoutes);

//auth routes
const authRoutes = require("./Routes/authroutes");
app.use("/api/auth", authRoutes);

// ✅ TEST ROUTE
app.get("/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});