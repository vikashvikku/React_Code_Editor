import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useProject } from "../context/ProjectContext";
import { Navbar } from "../components/Navbar/Navbar";
import { FileExplorer } from "../components/FileExplorer/FileExplorer";
import { CodeEditor } from "../components/Editor/CodeEditor";
import { LivePreview } from "../components/Preview/LivePreview";
import { CreateFileModal } from "../components/Modals/CreateFileModal";
import { RenameFileModal } from "../components/Modals/RenameFileModal";
import { Loader } from "../components/Loader";
import "../styles/editor.css";

const EditorPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const {
    currentProject,
    files,
    activeFile,
    isLoading,
    loadProject,
    updateFile,
    createFile,
    deleteFile,
    renameFile,
    setActiveFile,
  } = useProject();

  const [showCreateFileModal, setShowCreateFileModal] = useState(false);
  const [showRenameFileModal, setShowRenameFileModal] = useState(false);
  const [fileToRename, setFileToRename] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ✅ Prevent multiple API calls
  const hasLoaded = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("cipherstudio-token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!hasLoaded.current && projectId) {
      hasLoaded.current = true;
      loadProject(projectId);
    }
  }, [projectId, navigate, loadProject]);

  // ===== File Handlers =====
  const handleFileSelect = (fileName) => setActiveFile(fileName);

  const handleFileCreate = (fileName, content = "") => {
    createFile(fileName, content);
    setShowCreateFileModal(false);
  };

  const handleFileRename = (oldName, newName) => {
    renameFile(oldName, newName);
    setShowRenameFileModal(false);
    setFileToRename(null);
  };

  const handleFileDelete = (fileName) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      deleteFile(fileName);
    }
  };

  const handleFileContentChange = (fileName, content) =>
    updateFile(fileName, content);

  const openRenameModal = (fileName) => {
    setFileToRename(fileName);
    setShowRenameFileModal(true);
  };

  // ===== Loading / Error States =====
  if (isLoading) return <Loader />;

  if (!currentProject) {
    return (
      <div className={`editor-page ${isDark ? "dark" : "light"}`}>
        <div className="error-state">
          <h2>Project not found</h2>
          <p>
            The project you're looking for doesn’t exist or you don’t have
            access to it.
          </p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // ===== Main Layout =====
  return (
    <div className={`editor-page ${isDark ? "dark" : "light"}`}>
      <Navbar
        project={currentProject}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />

      <div className="editor-layout">
        <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
          <FileExplorer
            files={files}
            activeFile={activeFile}
            onFileSelect={handleFileSelect}
            onFileCreate={() => setShowCreateFileModal(true)}
            onFileRename={openRenameModal}
            onFileDelete={handleFileDelete}
          />
        </div>

        <div className="main-content">
          <div className="editor-container">
            <CodeEditor
              fileName={activeFile}
              content={activeFile ? files[activeFile] || "" : ""}
              onChange={(content) =>
                handleFileContentChange(activeFile, content)
              }
            />
          </div>

          <div className="preview-container">
            <LivePreview files={files} activeFile={activeFile} />
          </div>
        </div>
      </div>

      {showCreateFileModal && (
        <CreateFileModal
          onClose={() => setShowCreateFileModal(false)}
          onSuccess={handleFileCreate}
          existingFiles={Object.keys(files)}
        />
      )}

      {showRenameFileModal && fileToRename && (
        <RenameFileModal
          currentName={fileToRename}
          onClose={() => {
            setShowRenameFileModal(false);
            setFileToRename(null);
          }}
          onSuccess={handleFileRename}
          existingFiles={Object.keys(files)}
        />
      )}
    </div>
  );
};

export default EditorPage;
