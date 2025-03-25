import { z } from "zod";

export const AgencySchema = z.object({
  id: z.string().optional(), // ULID de 26 caracteres
  fantasyName: z.string().min(3).max(255),
  corporateName: z.string().min(3).max(255),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
  stateRegistration: z.string().max(20).optional(),
  municipalRegistration: z.string().max(20).optional(),
  status: z
    .enum(["active", "inactive", "pending", "suspended"])
    .default("pending"),
  foundationDate: z.coerce.date().optional(),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
  website: z.string().url().optional(),
});

const CreateAgencySchema = AgencySchema.omit({ id: true });

export type AgencySchema = z.infer<typeof AgencySchema>;
export type CreateAgencyInput = z.infer<typeof CreateAgencySchema>;

export const CreateAgencyRequestSchema = z.object({
  body: CreateAgencySchema,
  query: z.any(),
  params: z.any(),
});
