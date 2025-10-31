import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useProject } from "../context/ProjectContext";
import { ThemeToggle } from "../components/ThemeToggle";
import { CreateProjectModal } from "../components/Modals/CreateProjectModal";
import { Loader } from "../components/Loader";
import {
  FolderPlus,
  Code,
  Play,
  Trash2,
  Edit,
  Home,
  Settings,
} from "lucide-react";
import "../styles/home.css";

const HomePage = () => {
  const { isDark } = useTheme();
  const { projects, loadProjects, deleteProject, isLoading } = useProject();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("CodeEditor-user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      loadProjects(userData.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("CodeEditor-token");
    localStorage.removeItem("CodeEditor-user");
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className={`home-page ${isDark ? "dark" : "light"}`}>
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="brand">CodeEditor</span>
            </h1>
            <p className="hero-subtitle">
              Your browser-based React IDE for creating, editing, and previewing
              React applications
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Create Account
              </Link>
            </div>
          </div>
          <div className="hero-features">
            <div className="feature">
              <Code className="feature-icon" />
              <h3>Code Editor</h3>
              <p>Write React code with syntax highlighting and IntelliSense</p>
            </div>
            <div className="feature">
              <Play className="feature-icon" />
              <h3>Live Preview</h3>
              <p>See your changes in real-time as you code</p>
            </div>
            <div className="feature">
              <FolderPlus className="feature-icon" />
              <h3>Project Management</h3>
              <p>Create and manage multiple React projects</p>
            </div>
          </div>
        </div>
        <div className="footer">
          <ThemeToggle />
        </div>
      </div>
    );
  }

  return (
    <div className={`home-page ${isDark ? "dark" : "light"}`}>
      {/*   Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button
              onClick={() => navigate("/")}
              className="header-button btn-home"
            >
              <Home /> Home
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="header-button btn-settings"
            >
              <Settings /> Settings
            </button>
          </div>

          <div className="header-right">
            <ThemeToggle />
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="projects-header">
          <h2>Your Projects</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            <FolderPlus className="btn-icon" />
            New Project
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="projects-grid">
            {projects && projects.length === 0 ? (
              <div className="empty-state">
                <FolderPlus className="empty-icon" />
                <h3>No projects yet</h3>
                <p>Create your first React project to get started</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="btn btn-primary"
                >
                  Create Project
                </button>
              </div>
            ) : (
              projects.map((project) => (
                <div key={project._id} className="project-card">
                  <div className="project-header">
                    <h3 className="project-title">{project.name}</h3>
                    <div className="project-actions">
                      <button
                        onClick={() => navigate(`/editor/${project._id}`)}
                        className="btn-icon"
                        title="Open Project"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="btn-icon danger"
                        title="Delete Project"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                  <div className="project-info">
                    <p className="project-files">
                      {Object.keys(project.files || {}).length} files
                    </p>
                    <p className="project-date">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/editor/${project._id}`)}
                    className="btn btn-primary project-open"
                  >
                    Open Project
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
