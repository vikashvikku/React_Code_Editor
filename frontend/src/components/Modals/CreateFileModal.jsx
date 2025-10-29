import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, FilePlus } from 'lucide-react';

export const CreateFileModal = ({ onClose, onSuccess, existingFiles = [] }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    fileName: '',
    content: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fileName.trim()) {
      setError('File name is required');
      return;
    }

    // Check if file already exists
    if (existingFiles.includes(formData.fileName.trim())) {
      setError('A file with this name already exists');
      return;
    }

    // Validate file extension
    const fileName = formData.fileName.trim();
    if (!fileName.includes('.')) {
      setError('Please include a file extension (e.g., .jsx, .js, .css)');
      return;
    }

    onSuccess(fileName, formData.content);
  };

  const getDefaultContent = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'jsx':
        return `import React from 'react';

function ${fileName.split('.')[0]}() {
  return (
    <div>
      <h1>${fileName.split('.')[0]}</h1>
    </div>
  );
}

export default ${fileName.split('.')[0]};`;
      
      case 'js':
        return `// ${fileName}
console.log('Hello from ${fileName}');`;
      
      case 'css':
        return `/* ${fileName} */
.${fileName.split('.')[0].toLowerCase()} {
  /* Your styles here */
}`;
      
      case 'html':
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`;
      
      default:
        return `// ${fileName}`;
    }
  };

  const handleFileNameChange = (e) => {
    const fileName = e.target.value;
    setFormData({
      fileName,
      content: getDefaultContent(fileName)
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${isDark ? 'dark' : 'light'}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <FilePlus size={20} />
            Create New File
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="fileName">File Name</label>
            <input
              type="text"
              id="fileName"
              name="fileName"
              value={formData.fileName}
              onChange={handleFileNameChange}
              placeholder="e.g., App.jsx, styles.css, utils.js"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Initial Content (Optional)</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter initial file content"
              rows="8"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
