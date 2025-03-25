import "dotenv/config";
import express from "express";
import "express-async-errors";
import { adminRoutes } from "./http/routes/adminRoutes";

const app = express();

app.use(express.json());

app.use(adminRoutes);

export { app };
