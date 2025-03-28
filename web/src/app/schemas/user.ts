import { z } from "zod";
import { RoleKeys, ROLES } from "../constants/userRole";

export const userSignInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, or &)"
    ),
});

const roleSchema = z.custom<RoleKeys>(
  (val) => {
    return Object.keys(ROLES).includes(val as string);
  },
  {
    message: `Role must be one of: ${Object.values(ROLES)
      .map((r) => r.label)
      .join(", ")}`,
  }
);

export const userSignUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, or &)"
    ),
  role: roleSchema,
});

export type UserSignUpInput = z.infer<typeof userSignUpSchema>;
export type UserSignInInput = z.infer<typeof userSignInSchema>;
