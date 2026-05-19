import { useState } from "react";

function RepoAnalyzer({ onAnalyzeRepo }) {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = () => {
    if (!repoUrl) return alert("Enter repo URL");
    onAnalyze(repoUrl);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Paste GitHub Repo URL..."
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "5px"
        }}
      />
      <button onClick={() => onAnalyzeRepo(repoUrl)}>
        Analyze Repo
      </button>
    </div>
  );
}

export default RepoAnalyzer;