import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FileItem } from './FileItem';
import { FilePlus, FolderOpen } from 'lucide-react';

export const FileExplorer = ({
  files,
  activeFile,
  onFileSelect,
  onFileCreate,
  onFileRename,
  onFileDelete
}) => {
  const { isDark } = useTheme();
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const organizeFiles = (files) => {
    const organized = {
      root: [],
      folders: {}
    };

    Object.keys(files).forEach(fileName => {
      if (fileName.includes('/')) {
        const parts = fileName.split('/');
        const folder = parts[0];
        const file = parts.slice(1).join('/');
        
        if (!organized.folders[folder]) {
          organized.folders[folder] = [];
        }
        organized.folders[folder].push(file);
      } else {
        organized.root.push(fileName);
      }
    });

    return organized;
  };

  const organizedFiles = organizeFiles(files);

  return (
    <div className={`file-explorer ${isDark ? 'dark' : 'light'}`}>
      <div className="file-explorer-header">
        <h3>
          <FolderOpen size={16} />
          Files
        </h3>
        <button
          onClick={onFileCreate}
          className="file-explorer-action"
          title="Create new file"
        >
          <FilePlus size={16} />
        </button>
      </div>

      <div className="file-explorer-content">
        {/* Root files */}
        {organizedFiles.root.map(fileName => (
          <FileItem
            key={fileName}
            fileName={fileName}
            isActive={activeFile === fileName}
            onSelect={() => onFileSelect(fileName)}
            onRename={() => onFileRename(fileName)}
            onDelete={() => onFileDelete(fileName)}
          />
        ))}

        {/* Folders */}
        {Object.keys(organizedFiles.folders).map(folderName => (
          <div key={folderName} className="file-folder">
            <div
              className="file-folder-header"
              onClick={() => toggleFolder(folderName)}
            >
              <span className={`folder-icon ${expandedFolders[folderName] ? 'expanded' : ''}`}>
                ▶
              </span>
              <span className="folder-name">{folderName}</span>
            </div>
            
            {expandedFolders[folderName] && (
              <div className="file-folder-content">
                {organizedFiles.folders[folderName].map(fileName => {
                  const fullPath = `${folderName}/${fileName}`;
                  return (
                    <FileItem
                      key={fullPath}
                      fileName={fullPath}
                      isActive={activeFile === fullPath}
                      onSelect={() => onFileSelect(fullPath)}
                      onRename={() => onFileRename(fullPath)}
                      onDelete={() => onFileDelete(fullPath)}
                      isNested={true}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {Object.keys(files).length === 0 && (
          <div className="file-explorer-empty">
            <p>No files yet</p>
            <button onClick={onFileCreate} className="btn btn-primary btn-sm">
              Create your first file
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
