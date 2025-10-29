import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, Edit2 } from 'lucide-react';

export const RenameFileModal = ({ currentName, onClose, onSuccess, existingFiles = [] }) => {
  const { isDark } = useTheme();
  const [newName, setNewName] = useState(currentName);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setNewName(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!newName.trim()) {
      setError('File name is required');
      return;
    }

    if (newName.trim() === currentName) {
      onClose();
      return;
    }

    // Check if new name already exists
    if (existingFiles.includes(newName.trim())) {
      setError('A file with this name already exists');
      return;
    }

    // Validate file extension
    if (!newName.trim().includes('.')) {
      setError('Please include a file extension (e.g., .jsx, .js, .css)');
      return;
    }

    onSuccess(currentName, newName.trim());
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${isDark ? 'dark' : 'light'}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <Edit2 size={20} />
            Rename File
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="newName">New File Name</label>
            <input
              type="text"
              id="newName"
              name="newName"
              value={newName}
              onChange={handleChange}
              placeholder="Enter new file name"
              required
              autoFocus
            />
            <small className="form-help">
              Current name: <code>{currentName}</code>
            </small>
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
              Rename File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
