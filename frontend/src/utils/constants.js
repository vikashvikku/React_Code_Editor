// constants.js - Application constants

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  PROJECTS: {
    CREATE: '/project',
    GET_USER_PROJECTS: (userId) => `/project/user/${userId}`,
    GET_PROJECT: (projectId) => `/project/${projectId}`,
    UPDATE_PROJECT: (projectId) => `/project/${projectId}`,
    DELETE_PROJECT: (projectId) => `/project/${projectId}`,
  },
  FILES: {
    CREATE: '/file',
    GET_FILE: (projectId) => `/file/${projectId}`,
    UPDATE_FILE: (projectId) => `/file/${projectId}`,
    DELETE_FILE: (projectId) => `/file/${projectId}`,
  },
};

export const FILE_TYPES = {
  JAVASCRIPT: ['js', 'jsx'],
  TYPESCRIPT: ['ts', 'tsx'],
  CSS: ['css', 'scss', 'sass'],
  HTML: ['html', 'htm'],
  JSON: ['json'],
  MARKDOWN: ['md', 'markdown'],
  OTHER: ['txt', 'xml', 'yaml', 'yml'],
};

export const DEFAULT_FILES = {
  'App.jsx': `import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to CipherStudio!</h1>
      <p>Start editing your React components to see them here.</p>
      <div style={{ 
        background: '#f0f0f0', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>Getting Started:</h2>
        <ul>
          <li>Create a new file (e.g., App.jsx)</li>
          <li>Write your React component</li>
          <li>See it update here in real-time!</li>
        </ul>
      </div>
    </div>
  );
}

export default App;`,
  
  'index.js': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
  
  'styles.css': `/* Global Styles */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn:hover {
  background-color: #0056b3;
}`,
};

export const MONACO_EDITOR_THEMES = {
  LIGHT: 'vs-light',
  DARK: 'vs-dark',
};

export const MONACO_EDITOR_LANGUAGES = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript',
  CSS: 'css',
  HTML: 'html',
  JSON: 'json',
  MARKDOWN: 'markdown',
};

export const STORAGE_KEYS = {
  TOKEN: 'cipherstudio-token',
  USER: 'cipherstudio-user',
  THEME: 'cipherstudio-theme',
  PROJECT: 'cipherstudio-current-project',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EDITOR: '/editor',
  EDITOR_PROJECT: (projectId) => `/editor/${projectId}`,
};

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  PROJECT_NAME_MAX_LENGTH: 50,
  FILE_NAME_MAX_LENGTH: 100,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  PROJECT_NOT_FOUND: 'Project not found.',
  FILE_NOT_FOUND: 'File not found.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_EXISTS: 'User with this email already exists.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long.',
  FILE_NAME_INVALID: 'Please enter a valid file name with extension.',
  FILE_ALREADY_EXISTS: 'A file with this name already exists.',
};

export const SUCCESS_MESSAGES = {
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  FILE_CREATED: 'File created successfully!',
  FILE_UPDATED: 'File updated successfully!',
  FILE_DELETED: 'File deleted successfully!',
  FILE_RENAMED: 'File renamed successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Account created successfully!',
};

export const THEME_CONFIG = {
  LIGHT: {
    name: 'light',
    label: 'Light',
    icon: '☀️',
  },
  DARK: {
    name: 'dark',
    label: 'Dark',
    icon: '🌙',
  },
};

export const EDITOR_CONFIG = {
  FONT_SIZE: 14,
  TAB_SIZE: 2,
  INSERT_SPACES: true,
  WORD_WRAP: 'on',
  MINIMAP_ENABLED: false,
  LINE_NUMBERS: 'on',
  FORMAT_ON_PASTE: true,
  FORMAT_ON_TYPE: true,
  SCROLL_BEYOND_LAST_LINE: false,
  AUTOMATIC_LAYOUT: true,
};
