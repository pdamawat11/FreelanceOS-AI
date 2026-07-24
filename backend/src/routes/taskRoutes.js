import express from "express";
import { createTask , getProjectTasks, updateTask,deleteTask,} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/project/:projectId", authMiddleware, getProjectTasks);
router.patch("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;