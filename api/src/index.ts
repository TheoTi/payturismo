import "dotenv/config";
import express from "express";
import "express-async-errors";
import fs from "node:fs";
import yaml from "js-yaml";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import { adminRoutes } from "./http/routes/adminRoutes";
import { publicRoutes } from "./http/routes/publicRoutes";

const app = express();

app.use(cors());
app.use(express.json());

const swaggerDocument = yaml.load(fs.readFileSync("./openapi.yaml", "utf8"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument as any));

app.use(adminRoutes);
app.use(publicRoutes);

export { app };
