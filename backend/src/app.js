import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import healthRoutes from "./routes/healthRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

app.use("/api/health", healthRoutes);
app.use("/api/users", userRoutes);

export default app;
