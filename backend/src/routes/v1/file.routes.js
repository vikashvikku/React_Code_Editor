import express from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware.js";
import {
  createFile,
  getFile,
  updateFile,
  deleteFile,
} from "../../controllers/file.controller.js";

const fileRouter = express.Router();

fileRouter.post("/", AuthMiddleware, createFile);
fileRouter.get("/:id", AuthMiddleware, getFile);
fileRouter.put("/:id", AuthMiddleware, updateFile);
fileRouter.delete("/:id", AuthMiddleware, deleteFile);

export default fileRouter;
