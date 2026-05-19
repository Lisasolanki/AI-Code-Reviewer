import { useState, useEffect } from "react";
import axios from "axios";

import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";
import Loader from "../components/Loader";
import RepoInput from "../components/RepoInput";

import "../styles/home.css";

function getScoreColor(score) {
  if (score > 85) return "#00ff88";
  if (score > 70) return "#00f5ff";
  if (score > 40) return "#ffb800";
  return "#ff3366";
}

function Home({ onAnalyze, onAnalyzeRepo, result, loading }) {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/history",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setHistory(res.data);

      } catch (err) {

        console.log(err);

      }
    };

    fetchHistory();

  }, []);

  return (
    <div className="home-container">

      <div className="hero-section">
        <h1 className="hero-title">
          Review Code.
          <span className="hero-title-accent">Ship Better.</span>
        </h1>
      </div>

      <div className="repo-section">
        <RepoInput onAnalyze={onAnalyzeRepo} />
      </div>

      <div className="main-grid">

        <div className="editor-card">
          <CodeEditor
            onAnalyze={onAnalyze}
            loading={loading}
          />
        </div>

        <div className="output-card">
          {loading
            ? <Loader />
            : <OutputPanel result={result} />
          }
        </div>

      </div>

      <div className="history-section">

        <h2>Recent History</h2>

        {history.length === 0 ? (

          <p>No history found</p>

        ) : (

          <div className="history-grid">

            {history.map((item, i) => (

              <div
                key={i}
                className="history-card"
              >

                <p>
                  {item.repoUrl
                    ? "GitHub Repo"
                    : "Code Analysis"}
                </p>

                <p>
                  Score: {item.result?.score}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Home;