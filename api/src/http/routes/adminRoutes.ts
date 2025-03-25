import { Router } from "express";
import { adminController } from "../controllers/AdminController";
import { validateRequest } from "../middlewares/validateRequest";
import { CreateAgencyRequestSchema } from "../../validators/createAgencyZodSchema";
import { updateAgencyRequestSchema } from "../../validators/updateAgencyZodSchema";

const adminRoutes = Router();

adminRoutes.get("/agency/:", adminController.listAgencies);
adminRoutes.get("/agency/:id/:", adminController.findAgencyById);
adminRoutes.delete("/agency/:id/:", adminController.deleteAgency);
adminRoutes.post(
  "/agency/:",
  validateRequest(CreateAgencyRequestSchema),
  adminController.createAgency
);
adminRoutes.put(
  "/agency/:id/:",
  validateRequest(updateAgencyRequestSchema),
  adminController.updateAgency
);

export { adminRoutes };
