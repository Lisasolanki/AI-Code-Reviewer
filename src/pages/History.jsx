import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/history.css";

function getScoreColor(score) {
  if (score > 85) return "#00ff88";
  if (score > 70) return "#00f5ff";
  if (score > 40) return "#ffb800";
  return "#ff3366";
}

function MiniRing({ score }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = getScoreColor(score);

  return (
    <svg width="56" height="56">
      <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
      <circle
        cx="28" cy="28" r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 28 28)"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <text x="28" y="33" textAnchor="middle" fill={color}
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "12px" }}>
        {score}
      </text>
    </svg>
  );
}

function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  return (
    <div className="history-page">
      <div className="history-page-header">
        <div className="history-page-tag">📜 Analysis Log</div>
        <h1 className="history-page-title">Your History</h1>
        <p className="history-page-subtitle">
          // {data.length} total analyses stored
        </p>
      </div>

      {loading ? (
        <p style={{ color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace", fontSize: "13px" }}>
          Loading...
        </p>
      ) : data.length === 0 ? (
        <div className="history-empty">
          <span className="history-empty-icon">🔍</span>
          <h3>Nothing here yet</h3>
          <p>Go to the home page and analyze some code to see your history.</p>
        </div>
      ) : (
        <div className="history-items">
          {data.map((item) => {
            const score = item.result?.score ?? 0;
            const color = getScoreColor(score);
            return (
              <div
                key={item._id}
                className="history-item-card"
                style={{ "--score-color": color }}
              >
                <MiniRing score={score} />
                <div className="history-item-info">
                  <div className="history-item-type">
                    {item.repoUrl ? "GitHub Repository" : "Code Analysis"}
                    {item.repoUrl && (
                      <span style={{ marginLeft: 8, color: "var(--accent-violet)" }}>
                        — {item.repoUrl.replace("https://github.com/", "")}
                      </span>
                    )}
                  </div>
                  <p className="history-item-summary">{item.result?.summary}</p>
                </div>
                <span className="history-item-arrow">→</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
