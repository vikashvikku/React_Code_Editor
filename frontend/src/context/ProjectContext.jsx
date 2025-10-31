import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { projectService } from "../services/projectService";

const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [files, setFiles] = useState({});
  const [activeFile, setActiveFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //  API ACTIONS 

  //  Load all projects for a user
  const loadProjects = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await projectService.getUserProjects(userId);
      setProjects(response.data.projects);
    } catch (err) {
      console.error("Error loading projects:", err);
      setError("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, []);

  //  Load a specific project
  const loadProject = useCallback(async (projectId) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await projectService.getProject(projectId);
      const project = response.data.project;

      setCurrentProject(project);
      setFiles(project.files || {});

      const fileNames = Object.keys(project.files || {});
      if (fileNames.length > 0) setActiveFile(fileNames[0]);

      return project;
    } catch (err) {
      console.error("Error loading project:", err);
      setError("Failed to load project");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  //  Create new project
  const createProject = useCallback(async (projectData) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await projectService.createProject(projectData);
      const newProject = response.data.project;
      setProjects((prev) => [...prev, newProject]);
      return newProject;
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Failed to create project");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  //  Update project
  const updateProject = useCallback(async (projectId, updates) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await projectService.updateProject(projectId, updates);
      const updatedProject = response.data.project;

      setCurrentProject(updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? updatedProject : p))
      );

      return updatedProject;
    } catch (err) {
      console.error("Error updating project:", err);
      setError("Failed to update project");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  //  Delete project
  const deleteProject = useCallback(
    async (projectId) => {
      try {
        setIsLoading(true);
        setError(null);
        await projectService.deleteProject(projectId);
        setProjects((prev) => prev.filter((p) => p._id !== projectId));

        if (currentProject?._id === projectId) {
          setCurrentProject(null);
          setFiles({});
          setActiveFile(null);
        }
      } catch (err) {
        console.error("Error deleting project:", err);
        setError("Failed to delete project");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [currentProject]
  );

  //  FILE ACTIONS 
  const createFile = useCallback(
    (fileName, content = "") => {
      const newFiles = { ...files, [fileName]: content };
      setFiles(newFiles);
      setActiveFile(fileName);
      return newFiles;
    },
    [files]
  );

  const updateFile = useCallback(
    (fileName, content) => {
      const newFiles = { ...files, [fileName]: content };
      setFiles(newFiles);
      return newFiles;
    },
    [files]
  );

  const deleteFile = useCallback(
    (fileName) => {
      const newFiles = { ...files };
      delete newFiles[fileName];
      setFiles(newFiles);

      if (activeFile === fileName) {
        const remaining = Object.keys(newFiles);
        setActiveFile(remaining.length ? remaining[0] : null);
      }
      return newFiles;
    },
    [files, activeFile]
  );

  const renameFile = useCallback(
    (oldName, newName) => {
      if (oldName === newName) return files;
      const newFiles = { ...files };
      newFiles[newName] = newFiles[oldName];
      delete newFiles[oldName];
      setFiles(newFiles);
      if (activeFile === oldName) setActiveFile(newName);
      return newFiles;
    },
    [files, activeFile]
  );

  //  MEMOIZED CONTEXT VALUE 
  const value = useMemo(
    () => ({
      currentProject,
      projects,
      files,
      activeFile,
      isLoading,
      error,
      loadProjects,
      createProject,
      loadProject,
      updateProject,
      deleteProject,
      createFile,
      updateFile,
      deleteFile,
      renameFile,
      setActiveFile,
      setCurrentProject,
      setError,
    }),
    [
      currentProject,
      projects,
      files,
      activeFile,
      isLoading,
      error,
      loadProjects,
      createProject,
      loadProject,
      updateProject,
      deleteProject,
      createFile,
      updateFile,
      deleteFile,
      renameFile,
    ]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
