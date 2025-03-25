import { Router } from "express";
import { userController } from "../controllers/UserController";
import { validateRequest } from "../middlewares/validateRequest";
import { CreateUserRequestSchema } from "../../validators/createUserZodSchema";

const publicRoutes = Router();

publicRoutes.post(
  "/register/:",
  validateRequest(CreateUserRequestSchema),
  userController.createUser
);
publicRoutes.get("/users/:", userController.listUsers);

export { publicRoutes };
