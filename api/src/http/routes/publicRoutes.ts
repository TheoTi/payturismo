import { Router } from "express";
import { userController } from "../controllers/UserController";
import { validateRequest } from "../middlewares/validateRequest";
import { CreateUserRequestSchema } from "../../validators/createUserZodSchema";
import { AuthenticateUserRequestSchema } from "../../validators/authenticateUserZodSchema";

const publicRoutes = Router();

publicRoutes.post(
  "/register/:",
  validateRequest(CreateUserRequestSchema),
  userController.createUser
);

publicRoutes.post(
  "/login/:",
  validateRequest(AuthenticateUserRequestSchema),
  userController.login
);

publicRoutes.get("/users/:", userController.listUsers);

export { publicRoutes };
