import { Router } from "express";
import { adminController } from "../controllers/AdminController";
import { validateRequest } from "../middlewares/validateRequest";
import { CreateAgencyRequestSchema } from "../../validators/createAgencyZodSchema";

const adminRoutes = Router();

adminRoutes.get("/agency/:", adminController.listAgencies);
adminRoutes.get("/agency/:id/:", adminController.findAgencyById);
adminRoutes.delete("/agency/:id/:", adminController.deleteAgency);
adminRoutes.post(
  "/agency/:",
  validateRequest(CreateAgencyRequestSchema),
  adminController.createAgency
);

export { adminRoutes };
