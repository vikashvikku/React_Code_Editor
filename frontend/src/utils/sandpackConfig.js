// sandpackConfig.js - Sandpack configuration for React code execution

export const SANDPACK_THEMES = {
  light: {
    colors: {
      surface1: '#ffffff',
      surface2: '#f8f9fa',
      surface3: '#e9ecef',
      disabled: '#adb5bd',
      base: '#ffffff',
      clickable: '#6c757d',
      hover: '#495057',
      accent: '#007bff',
      error: '#dc3545',
      errorSurface: '#f8d7da',
      warning: '#ffc107',
      warningSurface: '#fff3cd',
    },
    syntax: {
      plain: '#212529',
      comment: '#6c757d',
      keyword: '#007bff',
      tag: '#dc3545',
      punctuation: '#6c757d',
      definition: '#6f42c1',
      property: '#28a745',
      string: '#dc3545',
    },
    font: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      mono: '"Monaco", "Menlo", "Ubuntu Mono", monospace',
      size: '14px',
      lineHeight: '1.5',
    },
  },
  dark: {
    colors: {
      surface1: '#1a1a1a',
      surface2: '#2d2d2d',
      surface3: '#404040',
      disabled: '#808080',
      base: '#1a1a1a',
      clickable: '#b3b3b3',
      hover: '#ffffff',
      accent: '#0d6efd',
      error: '#dc3545',
      errorSurface: '#2d1b1b',
      warning: '#ffc107',
      warningSurface: '#2d2a1b',
    },
    syntax: {
      plain: '#ffffff',
      comment: '#808080',
      keyword: '#0d6efd',
      tag: '#dc3545',
      punctuation: '#b3b3b3',
      definition: '#6f42c1',
      property: '#28a745',
      string: '#dc3545',
    },
    font: {
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      mono: '"Monaco", "Menlo", "Ubuntu Mono", monospace',
      size: '14px',
      lineHeight: '1.5',
    },
  },
};

export const SANDPACK_TEMPLATES = {
  react: {
    files: {
      '/App.js': {
        code: `export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to CipherStudio!</h1>
      <p>Start editing your React components to see them here.</p>
    </div>
  );
}`,
      },
      '/index.js': {
        code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`,
      },
      '/styles.css': {
        code: `body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}`,
      },
    },
    dependencies: {
      react: '^18.0.0',
      'react-dom': '^18.0.0',
    },
  },
  'react-ts': {
    files: {
      '/App.tsx': {
        code: `import React from 'react';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to CipherStudio!</h1>
      <p>Start editing your React components to see them here.</p>
    </div>
  );
};

export default App;`,
      },
      '/index.tsx': {
        code: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`,
      },
      '/styles.css': {
        code: `body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}`,
      },
    },
    dependencies: {
      react: '^18.0.0',
      'react-dom': '^18.0.0',
      '@types/react': '^18.0.0',
      '@types/react-dom': '^18.0.0',
      typescript: '^4.9.0',
    },
  },
};

export const SANDPACK_OPTIONS = {
  bundlerURL: 'https://bundler.ecosystem-dev.codesandbox.io',
  showNavigator: false,
  showRefreshButton: true,
  showOpenInCodeSandbox: false,
  autorun: true,
  autorunDelay: 300,
  recompileMode: 'delayed',
  recompileDelay: 300,
  initMode: 'lazy',
  initModeObserverOptions: {
    rootMargin: '1000px',
  },
  externalResources: [],
  logLevel: 'error',
  logLimit: 10,
  bundlerTimeout: 30000,
  skipEval: false,
  fileResolver: {},
  customNpmRegistries: [],
  disableDependencyPreprocessing: false,
  codeEditor: {
    showTabs: true,
    showLineNumbers: true,
    showInlineErrors: true,
    wrapContent: false,
    closableTabs: true,
    initMode: 'lazy',
    extensions: [],
    extensionsOptions: {},
  },
  previewOptions: {
    showNavigator: false,
    showRefreshButton: true,
    showOpenInCodeSandbox: false,
    showOpenInNewWindow: false,
    showErrorScreen: true,
    showLoadingScreen: true,
    showErrorOverlay: true,
    autorun: true,
    autorunDelay: 300,
    recompileMode: 'delayed',
    recompileDelay: 300,
    initMode: 'lazy',
    initModeObserverOptions: {
      rootMargin: '1000px',
    },
    externalResources: [],
    logLevel: 'error',
    logLimit: 10,
    bundlerTimeout: 30000,
    skipEval: false,
    fileResolver: {},
    customNpmRegistries: [],
    disableDependencyPreprocessing: false,
  },
};

export const getSandpackConfig = (theme = 'light', template = 'react') => {
  return {
    theme: SANDPACK_THEMES[theme] || SANDPACK_THEMES.light,
    template: template,
    options: SANDPACK_OPTIONS,
    files: SANDPACK_TEMPLATES[template]?.files || SANDPACK_TEMPLATES.react.files,
    dependencies: SANDPACK_TEMPLATES[template]?.dependencies || SANDPACK_TEMPLATES.react.dependencies,
  };
};

export const createSandpackFiles = (files) => {
  const sandpackFiles = {};
  
  Object.entries(files).forEach(([fileName, content]) => {
    // Ensure file starts with /
    const normalizedFileName = fileName.startsWith('/') ? fileName : `/${fileName}`;
    sandpackFiles[normalizedFileName] = {
      code: content,
    };
  });
  
  return sandpackFiles;
};

export const getFileLanguage = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    default:
      return 'javascript';
  }
};

export const validateSandpackFiles = (files) => {
  const errors = [];
  const warnings = [];
  
  // Check for main entry point
  const hasMainFile = Object.keys(files).some(fileName => 
    fileName.includes('App.js') || 
    fileName.includes('App.jsx') || 
    fileName.includes('App.tsx') ||
    fileName.includes('index.js') ||
    fileName.includes('index.jsx') ||
    fileName.includes('index.tsx')
  );
  
  if (!hasMainFile) {
    warnings.push('No main entry point found. Consider creating App.jsx or index.jsx');
  }
  
  // Check for React imports
  const hasReactImport = Object.values(files).some(content => 
    content.includes('import React') || 
    content.includes('from "react"') ||
    content.includes('from \'react\'')
  );
  
  if (!hasReactImport) {
    warnings.push('No React imports found. Make sure to import React in your components');
  }
  
  return { errors, warnings };
};
