import { useEffect, useState, useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";
import { RefreshCw, ExternalLink } from "lucide-react";

export const LivePreview = ({ files, activeFile }) => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🧠 Remove problematic imports and exports
  const sanitizeCode = (code) => {
    if (!code) return "";

    return (
      code
        // Remove all ES module imports and exports (even multiline)
        .replace(/^\s*import[\s\S]*?from\s+['"].*['"];?\s*$/gm, "")
        .replace(/^\s*import\s+['"].*['"];?\s*$/gm, "")
        .replace(/^\s*export\s+default\s+/gm, "")
        .replace(/^\s*export\s+\{[\s\S]*?\};?\s*$/gm, "")
        .trim()
    );
  };

  const generateAppCode = () => {
    const mainFile =
      files["App.jsx"] ||
      files["App.js"] ||
      files["index.jsx"] ||
      files["index.js"];

    if (mainFile) {
      return sanitizeCode(mainFile);
    }

    // Default React component if no main file exists
    return sanitizeCode(`
      import React from 'react';
      export default function App() {
        return (
          <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Welcome to CipherStudio!</h1>
            <p>Start editing your React components to see them here.</p>
          </div>
        );
      }
    `);
  };

  const generateHTML = () => {
    const appCode = generateAppCode();

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CipherStudio Preview</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }
    #root {
      width: 100%;
      min-height: 100vh;
    }
    .error {
      padding: 20px;
      background: #fee;
      border: 1px solid #fcc;
      border-radius: 4px;
      margin: 20px;
      color: #c33;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div id="root">Loading...</div>

  <script type="text/babel" data-presets="react,env">
    const React = window.React;
    const ReactDOM = window.ReactDOM;

    try {
      ${appCode}

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(App));
    } catch (error) {
      document.getElementById('root').innerHTML =
        '<div class="error"><h3>Error:</h3><pre>' + error.message + '</pre></div>';
    }
  </script>
</body>
</html>
    `;
  };

  // ✅ Memoize generated HTML
  const html = useMemo(
    () => generateHTML(),
    [JSON.stringify(files), activeFile]
  );

  // ✅ Debounced refresh
  useEffect(() => {
    if (Object.keys(files).length > 0) {
      setIsLoading(true);
      const timeout = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [JSON.stringify(files), activeFile]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleOpenInNewTab = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className={`live-preview ${isDark ? "dark" : "light"}`}>
      <div className="preview-toolbar">
        <div className="preview-toolbar-left">
          <h3>Live Preview</h3>
        </div>

        <div className="preview-toolbar-right">
          <button
            onClick={handleRefresh}
            className="preview-action"
            title="Refresh preview"
          >
            <RefreshCw size={16} />
          </button>

          <button
            onClick={handleOpenInNewTab}
            className="preview-action"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </div>

      <div className="preview-content">
        {isLoading ? (
          <div className="preview-loading">
            <RefreshCw className="loading-spinner" size={24} />
            <p>Refreshing preview...</p>
          </div>
        ) : error ? (
          <div className="preview-error">
            <h3>Preview Error</h3>
            <p>{error}</p>
            <button onClick={handleRefresh} className="btn btn-primary">
              Try Again
            </button>
          </div>
        ) : (
          <iframe
            srcDoc={html}
            className="preview-iframe"
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        )}
      </div>
    </div>
  );
};
