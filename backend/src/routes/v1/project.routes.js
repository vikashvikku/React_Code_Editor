import express from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware.js";
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../../controllers/project.controller.js";

const projectRouter = express.Router();

projectRouter.post("/", AuthMiddleware, createProject);
projectRouter.get("/user/:userId", AuthMiddleware, getUserProjects);
projectRouter.get("/:id", AuthMiddleware, getProjectById);
projectRouter.put("/:id", AuthMiddleware, updateProject);
projectRouter.delete("/:id", AuthMiddleware, deleteProject);

export default projectRouter;
