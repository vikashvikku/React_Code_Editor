import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import "./fileitem.css";

export const FileItem = ({
  fileName,
  isActive,
  onSelect,
  onRename,
  onDelete,
  isNested = false,
}) => {
  const { isDark } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "js":
      case "jsx":
        return "📘";
      case "ts":
      case "tsx":
        return "📗";
      case "css":
        return "🎨";
      case "html":
        return "🌐";
      case "json":
        return "🧾";
      case "md":
        return "📝";
      default:
        return "📄";
    }
  };

  const handleMenuAction = (action) => {
    setShowMenu(false);
    if (action === "rename") onRename();
    if (action === "delete") onDelete();
  };

  return (
    <div
      className={`file-item ${isActive ? "active" : ""} ${
        isNested ? "nested" : ""
      } ${isDark ? "dark" : "light"}`}
    >
      {/* Left: File name + icon */}
      <div
        className="file-name-section"
        onClick={onSelect}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowMenu(true);
        }}
      >
        <span className="file-icon">{getFileIcon(fileName)}</span>
        <span className="file-name-text">{fileName.split("/").pop()}</span>
      </div>

      {/* Right: 3-dot menu */}
      <div className="file-actions">
        <button
          className="file-action-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          title="Options"
        >
          <MoreVertical size={16} />
        </button>

        {showMenu && (
          <>
            <div className="file-dropdown">
              <button
                className="file-dropdown-item"
                onClick={() => handleMenuAction("rename")}
              >
                <Edit2 size={14} />
                Rename
              </button>
              <button
                className="file-dropdown-item delete"
                onClick={() => handleMenuAction("delete")}
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
            <div
              className="file-dropdown-overlay"
              onClick={() => setShowMenu(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};
