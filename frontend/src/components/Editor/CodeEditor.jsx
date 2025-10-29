import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { EditorToolbar } from './EditorToolbar';

export const CodeEditor = ({ fileName, content, onChange }) => {
  const { isDark } = useTheme();
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  useEffect(() => {
    // Dynamic import of Monaco Editor
    const loadMonaco = async () => {
      try {
        const monaco = await import('@monaco-editor/react');
        monacoRef.current = monaco;
      } catch (error) {
        console.error('Failed to load Monaco Editor:', error);
        // Fallback to textarea if Monaco fails to load
      }
    };

    loadMonaco();
  }, []);

  const getLanguage = (fileName) => {
    if (!fileName) return 'javascript';
    
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

  const handleEditorChange = (value) => {
    if (onChange) {
      onChange(value || '');
    }
  };

  if (!fileName) {
    return (
      <div className={`code-editor ${isDark ? 'dark' : 'light'}`}>
        <EditorToolbar fileName={fileName} />
        <div className="editor-placeholder">
          <p>Select a file to start editing</p>
        </div>
      </div>
    );
  }

  // Fallback to textarea if Monaco is not available
  if (!monacoRef.current) {
    return (
      <div className={`code-editor ${isDark ? 'dark' : 'light'}`}>
        <EditorToolbar fileName={fileName} />
        <textarea
          value={content || ''}
          onChange={(e) => handleEditorChange(e.target.value)}
          className="editor-textarea"
          placeholder="Start typing your code..."
        />
      </div>
    );
  }

  const MonacoEditor = monacoRef.current.default;

  return (
    <div className={`code-editor ${isDark ? 'dark' : 'light'}`}>
      <EditorToolbar fileName={fileName} />
      <div className="editor-container">
        <MonacoEditor
          height="100%"
          language={getLanguage(fileName)}
          theme={isDark ? 'vs-dark' : 'vs-light'}
          value={content || ''}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
};
