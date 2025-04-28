import express from "express";
import { deleteUser, login, register } from "../Controller/authController.js";
import verifyToken from "../Middleware/VerifyToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.delete("/delete", verifyToken, deleteUser);

export default router;
