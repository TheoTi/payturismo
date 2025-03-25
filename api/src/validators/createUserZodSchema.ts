import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(), // ULID de 26 caracteres
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
  role: z.enum(["admin", "analyst"]),
});

const CreateUserSchema = UserSchema.omit({ id: true });

export type UserSchema = z.infer<typeof UserSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const CreateUserRequestSchema = z.object({
  body: CreateUserSchema,
  query: z.any(),
  params: z.any(),
});
