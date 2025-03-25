import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

const adminRoutes = Router();

adminRoutes.get("/agency/:", AdminController.listAgencies);

export { adminRoutes };
