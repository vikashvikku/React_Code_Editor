import Project from "../models/project.model.js";

export const createFile = async (req, res) => {
  try {
    const { projectId, fileName, content } = req.body;
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    project.files[fileName] = content || "";
    await project.save();
    res.status(201).json({ message: "File created", files: project.files });
  } catch (error) {
    res.status(500).json({ message: "Error creating file", error: error.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileName } = req.query;
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json({ fileName, content: project.files[fileName] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching file", error: error.message });
  }
};

export const updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldName, newName, content } = req.body;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (newName && oldName !== newName) {
      project.files[newName] = project.files[oldName];
      delete project.files[oldName];
    }
    if (content !== undefined) {
      project.files[newName || oldName] = content;
    }
    await project.save();
    res.json({ message: "File updated", files: project.files });
  } catch (error) {
    res.status(500).json({ message: "Error updating file", error: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { fileName } = req.query;
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    delete project.files[fileName];
    await project.save();
    res.json({ message: "File deleted", files: project.files });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file", error: error.message });
  }
};
