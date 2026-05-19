import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoutes";

function App() {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (code) => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/analyze-code",
        {
          code,
          language: "javascript"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResult(res.data);

    } catch (err) {

      console.log(err);

      alert("Analyze failed");

    } finally {

      setLoading(false);
    }
  };

  const handleAnalyzeRepo = async (repoUrl) => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/analyze-repo",
        {
          repoUrl
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResult(res.data);

    } catch (err) {

      console.log(err);

      alert("Repo analyze failed");

    } finally {

      setLoading(false);
    }
  };

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <Home
              onAnalyze={handleAnalyze}
              onAnalyzeRepo={handleAnalyzeRepo}
              result={result}
              loading={loading}
            />
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;