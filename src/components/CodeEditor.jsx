import Editor from "@monaco-editor/react";
import { useState } from "react";
import "../styles/editor.css";

function CodeEditor({ onAnalyze, loading }) {
  const [code, setCode] = useState("");

  return (
    <div className="editor-container">
      <div className="editor-wrapper">
        <div className="editor-topbar">
          <div className="editor-dots">
            <span className="editor-dot red" />
            <span className="editor-dot yellow" />
            <span className="editor-dot green" />
          </div>
          <span className="editor-lang">javascript</span>
        </div>

        <Editor
          height="360px"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: "gutter",
            cursorBlinking: "smooth",
            smoothScrolling: true,
          }}
        />
      </div>

      <button
        className="editor-button"
        onClick={() => onAnalyze(code)}
        disabled={!code || loading}
      >
        {loading ? (
          <>
            <span className="analyzing-pulse" />
            Analyzing...
          </>
        ) : (
          <>
            ⚡ Analyze Code
          </>
        )}
      </button>
    </div>
  );
}

export default CodeEditor;
