import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import taskRoutes from "./Routes/taskRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Database connection

mongoose.connect(`${process.env.MONGO}`);

const db = mongoose.connection;

db.on("open", () => {
  console.log("Database connected successfully");
});

db.on("error", () => {
  console.log("Unable to connect to database");
});

// middlewares

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

app.listen(5000, () => {
  console.log("Server running in port 500");
});
