import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const { name, files } = req.body;
    const userId = req.userId;
    
    const project = await Project.create({ userId, name, files: files || {} });
    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error: error.message });
  }
};

export const getUserProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    const projects = await Project.find({ userId });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project updated", project: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};
