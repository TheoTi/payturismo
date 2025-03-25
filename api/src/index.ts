import "dotenv/config";
import express from "express";
import "express-async-errors";
import { adminRoutes } from "./http/routes/adminRoutes";
import { publicRoutes } from "./http/routes/publicRoutes";

const app = express();

app.use(express.json());

app.use(adminRoutes);
app.use(publicRoutes);

export { app };
