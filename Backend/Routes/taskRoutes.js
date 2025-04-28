import express from "express";
import {
  addTask,
  deleteTask,
  getTask,
  updateStatus,
  updateTask,
} from "../Controller/taskController.js";
import verifyToken from "../Middleware/VerifyToken.js";

const router = express.Router();

router.get("/all", verifyToken, getTask);
router.post("/add", verifyToken, addTask);
router.put("/status/:id", verifyToken, updateStatus);
router.put("/update/:id", verifyToken, updateTask);
router.delete("/delete/:id", verifyToken, deleteTask);

export default router;
