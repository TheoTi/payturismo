import { z } from "zod";

const UpdateAgencySchema = z.object({
  fantasyName: z.string().min(3).max(255).optional(),
  corporateName: z.string().min(3).max(255).optional(),
  cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    .optional(),
  stateRegistration: z.string().max(20).optional(),
  municipalRegistration: z.string().max(20).optional(),
  status: z
    .enum(["active", "inactive", "pending", "suspended"])
    .default("pending")
    .optional(),
  foundationDate: z.coerce.date().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8).max(20).optional(),
  website: z.string().url().optional(),
});

export type UpdateAgencyInput = z.infer<typeof UpdateAgencySchema>;

export const updateAgencyRequestSchema = z.object({
  body: UpdateAgencySchema,
  query: z.any(),
  params: z.object({
    id: z.string().min(2),
  }),
});
