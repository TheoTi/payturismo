import { z } from "zod";
import { Schema as AgencySchema } from "../entities/Agency";

const CreateAgencySchema = AgencySchema.omit({ id: true });

export const CreateAgencyRequestSchema = z.object({
  body: CreateAgencySchema,
  query: z.any(),
  params: z.any(),
});
