import { z } from "zod";

export const AuthenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthenticateUserInput = z.infer<typeof AuthenticateUserSchema>;

export const AuthenticateUserRequestSchema = z.object({
  body: AuthenticateUserSchema,
  query: z.any(),
  params: z.any(),
});
