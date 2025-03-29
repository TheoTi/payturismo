import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
extendZodWithOpenApi(z);

export const AuthenticateUserSchema = z.object({
  email: z.string().email().openapi({
    example: "john.doe@mail.com",
  }),
  password: z.string().min(8).openapi({
    example: "Admin@2024",
  }),
});

export type AuthenticateUserInput = z.infer<typeof AuthenticateUserSchema>;

export const AuthenticateUserRequestSchema = z.object({
  body: AuthenticateUserSchema,
  query: z.any(),
  params: z.any(),
});

AuthenticateUserSchema.openapi({ ref: "User" });
