import { Router } from "express";
import { adminController } from "../controllers/AdminController";

const adminRoutes = Router();

adminRoutes.get("/agency/:", adminController.listAgencies);
adminRoutes.get("/agency/:id/:", adminController.findAgencyById);

export { adminRoutes };
