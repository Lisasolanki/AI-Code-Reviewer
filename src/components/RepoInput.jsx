import { useState } from "react";
import "../styles/repoinput.css";

function RepoInput({ onAnalyze }) {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (!url) {
      alert("Please enter a GitHub repository URL");
      return;
    }
    onAnalyze(url);
  };

  return (
    <div className="repo-container">
      <div className="repo-header">
        <div className="repo-icon">⬡</div>
        <h2 className="repo-title">Analyze GitHub Repository</h2>
      </div>

      <p className="repo-subtitle">
        Paste a public repo URL and get an instant AI-powered code review.
      </p>

      <div className="repo-input-section">
        <input
          type="text"
          placeholder="https://github.com/username/repository"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="repo-input"
        />
        <button onClick={handleSubmit} className="repo-button">
          ↗ Analyze
        </button>
      </div>
    </div>
  );
}

export default RepoInput;
