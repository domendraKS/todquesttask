import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  createTask,
  getAllTask,
  getOneTask,
  deleteTask,
  updateTask,
} from "../controllers/task.controller.js";

const taskRoute = express.Router();

taskRoute.post("/", verifyUser, createTask);
taskRoute.get("/", verifyUser, getAllTask);
taskRoute.get("/:taskId", verifyUser, getOneTask);
taskRoute.delete("/:taskId", verifyUser, deleteTask);
taskRoute.put("/:taskId", verifyUser, updateTask);

export default taskRoute;
