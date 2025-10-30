import api from './api';

export const fileService = {
  // Create a new file
  createFile: async (projectId, fileName, content = '') => {
    const response = await api.post('/file', {
      projectId,
      fileName,
      content
    });
    return response;
  },

  // Get file content
  getFile: async (projectId, fileName) => {
    const response = await api.get(`/file/${projectId}?fileName=${fileName}`);
    return response;
  },

  // Update file content or rename
  updateFile: async (projectId, oldName, newName, content) => {
    const response = await api.put(`/file/${projectId}`, {
      oldName,
      newName,
      content
    });
    return response;
  },

  // Delete a file
  deleteFile: async (projectId, fileName) => {
    const response = await api.delete(`/file/${projectId}?fileName=${fileName}`);
    return response;
  },

  // Save file content (update without renaming)
  saveFile: async (projectId, fileName, content) => {
    return fileService.updateFile(projectId, fileName, fileName, content);
  },

  // Rename file
  renameFile: async (projectId, oldName, newName) => {
    return fileService.updateFile(projectId, oldName, newName, undefined);
  }
};
