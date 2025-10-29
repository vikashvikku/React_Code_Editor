import { useTheme } from '../../context/ThemeContext';
import { FileText, Save, Copy, Download } from 'lucide-react';

export const EditorToolbar = ({ fileName }) => {
  const { isDark } = useTheme();

  const handleSave = () => {
    // Auto-save is handled by the project context
    console.log('Manual save triggered');
  };

  const handleCopy = () => {
    // Copy current file content to clipboard
    navigator.clipboard.writeText(fileName || '');
  };

  const handleDownload = () => {
    // Download current file
    if (fileName) {
      const blob = new Blob([fileName], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={`editor-toolbar ${isDark ? 'dark' : 'light'}`}>
      <div className="editor-toolbar-left">
        <div className="file-info">
          <FileText size={16} />
          <span className="file-name">{fileName || 'No file selected'}</span>
        </div>
      </div>

      <div className="editor-toolbar-right">
        <button
          onClick={handleSave}
          className="toolbar-action"
          title="Save file"
        >
          <Save size={16} />
        </button>
        
        <button
          onClick={handleCopy}
          className="toolbar-action"
          title="Copy file name"
        >
          <Copy size={16} />
        </button>
        
        <button
          onClick={handleDownload}
          className="toolbar-action"
          title="Download file"
        >
          <Download size={16} />
        </button>
      </div>
    </div>
  );
};
