import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { ThemeToggle } from "../ThemeToggle";
import { Menu, Home, Save, Settings, LogOut } from "lucide-react";

export const Navbar = ({ project, onToggleSidebar, sidebarCollapsed }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cipherstudio-token");
    localStorage.removeItem("cipherstudio-user");
    setShowMenu(false);
    navigate("/login");
  };

  const handleHome = () => {
    setShowMenu(false);
    navigate("/");
  };

  const handleSave = () => {
    console.log("Manual save triggered");
  };

  return (
    <nav className={`navbar ${isDark ? "dark" : "light"}`}>
      {/* === Left Section === */}
      <div className="navbar-left">
        <button
          onClick={onToggleSidebar}
          className="navbar-toggle"
          title={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
        >
          <Menu size={20} />
        </button>

        <div className="navbar-brand">
          <h1>{project?.name || "CipherStudio"}</h1>
        </div>
      </div>

      {/* === Center Section === */}
      <div className="navbar-center">
        <button onClick={handleSave} className="navbar-action">
          <Save size={18} />
          <span>Save</span>
        </button>
      </div>

      {/* === Right Section === */}
      <div className="navbar-right">
        <ThemeToggle />

        <div className="navbar-menu" ref={menuRef}>
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="navbar-menu-toggle"
          >
            <Settings size={18} />
          </button>

          {showMenu && (
            <div className="navbar-dropdown">
              <button onClick={handleHome} className="navbar-dropdown-item">
                <Home size={16} />
                Home
              </button>
              <button
                onClick={handleLogout}
                className="navbar-dropdown-item danger"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
