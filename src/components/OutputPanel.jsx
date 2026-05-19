import "../styles/output.css";

function ScoreRing({ score }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s > 85) return "#00ff88";
    if (s > 70) return "#00f5ff";
    if (s > 40) return "#ffb800";
    return "#ff3366";
  };

  const color = getColor(score);

  return (
    <svg width="110" height="110" className="score-ring-svg">
      <circle
        className="score-ring-track"
        cx="55" cy="55"
        r={radius}
      />
      <circle
        className="score-ring-fill"
        cx="55" cy="55"
        r={radius}
        stroke={color}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
      <text x="55" y="51" className="score-ring-text" fill={color}>
        {score}
      </text>
      <text x="55" y="66" className="score-ring-sublabel">
        score
      </text>
    </svg>
  );
}

function OutputPanel({ result }) {
  if (!result || !result.issues) {
    return (
      <div className="empty-output">
        <div className="empty-output-visual">📊</div>
        <h2>No analysis yet</h2>
        <p>Paste your code or a GitHub repo URL and click analyze.</p>
      </div>
    );
  }

  const getBadge = (score) => {
    if (score > 85) return { label: "Excellent", cls: "excellent" };
    if (score > 70) return { label: "Good", cls: "good" };
    if (score > 40) return { label: "Average", cls: "average" };
    return { label: "Poor", cls: "poor" };
  };

  const badge = getBadge(result.score);

  return (
    <div className="output-container">
      {/* SCORE */}
      <div className="score-ring-wrapper">
        <ScoreRing score={result.score} />
        <div className="score-info">
          <h2>Code Quality</h2>
          <div className={`score-badge ${badge.cls}`}>
            ● {badge.label}
          </div>
        </div>
      </div>

      {/* BUGS */}
      <div className="output-section">
        <div className="output-section-header">
          <div className="output-section-icon icon-bugs">🐞</div>
          <span className="section-title">Bugs</span>
        </div>
        {result.issues?.bugs?.length > 0 ? (
          result.issues.bugs.map((bug, i) => (
            <div key={i} className="output-item">• {bug}</div>
          ))
        ) : (
          <div className="empty-message">✓ No bugs found</div>
        )}
      </div>

      {/* PERFORMANCE */}
      <div className="output-section">
        <div className="output-section-header">
          <div className="output-section-icon icon-perf">⚡</div>
          <span className="section-title">Performance Issues</span>
        </div>
        {result.issues?.performance?.length > 0 ? (
          result.issues.performance.map((item, i) => (
            <div key={i} className="output-item perf">• {item}</div>
          ))
        ) : (
          <div className="empty-message">✓ No performance issues</div>
        )}
      </div>

      {/* BEST PRACTICES */}
      <div className="output-section">
        <div className="output-section-header">
          <div className="output-section-icon icon-best">✅</div>
          <span className="section-title">Best Practices</span>
        </div>
        {result.issues?.bestPractices?.length > 0 ? (
          result.issues.bestPractices.map((item, i) => (
            <div key={i} className="output-item best">• {item}</div>
          ))
        ) : (
          <div className="empty-message">✓ Best practices followed</div>
        )}
      </div>

      {/* SUMMARY */}
      <div className="output-section">
        <div className="output-section-header">
          <div className="output-section-icon icon-sum">🧾</div>
          <span className="section-title">Summary</span>
        </div>
        <div className="summary-box">{result.summary}</div>
      </div>
    </div>
  );
}

export default OutputPanel;
