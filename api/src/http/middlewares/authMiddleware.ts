import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../../db/repositories/UserRepository";
import { z } from "zod";
import { env } from "../../config/env";

const AuthHeaderSchema = z.object({
  authorization: z.string().regex(/^Bearer .+$/, { message: "Invalid token." }),
});

export const authMiddleware = (roles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { success, data, error } = AuthHeaderSchema.safeParse(req.headers);

      if (!success) {
        res.status(401).json({
          error: error.issues,
        });

        return;
      }

      const token = data.authorization;

      const decoded = jwt.verify(token, env.jwtSecret) as {
        userId: string;
      };

      const user = await userRepository.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ error: "Invalid user." });
      }

      if (roles && !roles.includes(user.role)) {
        return res.status(403).json({ error: "Unauthorized." });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      return next();
    } catch (error) {
      console.error("Error occurred on authentication: ", error);

      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: "Token expired." });
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: "Invalid token." });
      }

      return res
        .status(500)
        .json({ error: "Error occurred on authentication" });
    }
  };
};
