import api from './api';

export const projectService = {
  // Create a new project
  createProject: async (projectData) => {
    const response = await api.post('/project', projectData);
    return response;
  },

  // Get all projects for a user
  getUserProjects: async (userId) => {
    const response = await api.get(`/project/user/${userId}`);
    return response;
  },

  // Get a specific project by ID
  getProject: async (projectId) => {
    const response = await api.get(`/project/${projectId}`);
    return response;
  },

  // Update a project
  updateProject: async (projectId, updates) => {
    const response = await api.put(`/project/${projectId}`, updates);
    return response;
  },

  // Delete a project
  deleteProject: async (projectId) => {
    const response = await api.delete(`/project/${projectId}`);
    return response;
  },

  // Create a file in a project
  createFile: async (projectId, fileName, content) => {
    const response = await api.post('/file', {
      projectId,
      fileName,
      content
    });
    return response;
  },

  // Get a file from a project
  getFile: async (projectId, fileName) => {
    const response = await api.get(`/file/${projectId}?fileName=${fileName}`);
    return response;
  },

  // Update a file in a project
  updateFile: async (projectId, oldName, newName, content) => {
    const response = await api.put(`/file/${projectId}`, {
      oldName,
      newName,
      content
    });
    return response;
  },

  // Delete a file from a project
  deleteFile: async (projectId, fileName) => {
    const response = await api.delete(`/file/${projectId}?fileName=${fileName}`);
    return response;
  }
};
