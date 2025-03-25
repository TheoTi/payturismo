import { Router } from "express";
import { adminController } from "../controllers/AdminController";
import { validateRequest } from "../middlewares/validateRequest";
import { CreateAgencyRequestSchema } from "../../validators/createAgencyZodSchema";
import { updateAgencyRequestSchema } from "../../validators/updateAgencyZodSchema";
import { authMiddleware } from "../middlewares/authMiddleware";

const adminRoutes = Router();

adminRoutes.get("/agency/:", authMiddleware(), adminController.listAgencies);

adminRoutes.get(
  "/agency/:id/:",
  authMiddleware(),
  adminController.findAgencyById
);

adminRoutes.delete(
  "/agency/:id/:",
  authMiddleware(["admin"]),
  adminController.deleteAgency
);

adminRoutes.post(
  "/agency/:",
  authMiddleware(),
  validateRequest(CreateAgencyRequestSchema),
  adminController.createAgency
);

adminRoutes.put(
  "/agency/:id/:",
  authMiddleware(),
  validateRequest(updateAgencyRequestSchema),
  adminController.updateAgency
);

export { adminRoutes };
