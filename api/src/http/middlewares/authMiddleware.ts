import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../../db/repositories/UserRepository";
import { z } from "zod";
import { env } from "../../config/env";

const AuthHeaderSchema = z.object({
  authorization: z.string().regex(/^Bearer .+$/, {
    message: "Authorization header must be in format: Bearer <token>",
  }),
});

interface JwtPayload {
  userId: string;
  email?: string;
  role?: string;
}

export const authMiddleware = (roles?: Array<"admin" | "analyst">) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const headerResult = AuthHeaderSchema.safeParse(req.headers);

      if (!headerResult.success) {
        return res.status(401).json({
          error: "Invalid authorization header",
          details: headerResult.error.format(),
        });
      }

      const token = headerResult.data.authorization.split(" ")[1];

      const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

      const user = await userRepository.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({
          error: "Invalid or inactive user account",
        });
      }

      if (roles && !roles.includes(user.role)) {
        return res.status(403).json({
          error: "Insufficient permissions",
          requiredRoles: roles,
          userRole: user.role,
        });
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      return next();
    } catch (error) {
      console.error("Authentication error:", error);

      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          error: "Token expired",
          solution: "Refresh your authentication token",
        });
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          error: "Invalid token",
          details: error.message,
        });
      }

      return res.status(500).json({
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};
