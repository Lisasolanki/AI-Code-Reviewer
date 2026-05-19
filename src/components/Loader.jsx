function Loader() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "360px",
      gap: "20px"
    }}>
      <div style={{
        width: "60px",
        height: "60px",
        border: "2px solid rgba(0,245,255,0.1)",
        borderTop: "2px solid var(--accent-cyan, #00f5ff)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          color: "var(--text-primary, #e8f4ff)",
          marginBottom: "6px"
        }}>
          Analyzing your code...
        </p>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: "var(--text-muted, #3d5a73)"
        }}>
          AI is reviewing for bugs, performance & best practices
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default Loader;
