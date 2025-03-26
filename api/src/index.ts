import "dotenv/config";
import express from "express";
import "express-async-errors";
import cors from "cors";

import { adminRoutes } from "./http/routes/adminRoutes";
import { publicRoutes } from "./http/routes/publicRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(adminRoutes);
app.use(publicRoutes);

export { app };
