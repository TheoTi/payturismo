import { randomBytes } from "node:crypto";
import { merge } from "lodash";
import { z } from "zod";

export const Schema = z.object({
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

const CreateAgencySchema = Schema.omit({ id: true });
export type AgencySchema = z.infer<typeof Schema>;
export type CreateAgencyInput = z.infer<typeof CreateAgencySchema>;

export class Agency implements AgencySchema {
  public id: string;
  public fantasyName: string;
  public corporateName: string;
  public cnpj: string;
  public stateRegistration?: string;
  public municipalRegistration?: string;
  public status: "active" | "inactive" | "pending" | "suspended";
  public foundationDate?: Date;
  public email: string;
  public phone: string;
  public website?: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(data: AgencySchema) {
    this.id = data.id || this.generateUlid();
    this.status = "pending";
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.email = "";
    this.phone = "";
    this.cnpj = "";
    this.corporateName = "";
    this.fantasyName = "";

    merge(this, data);

    this.validate();
  }

  private generateUlid(): string {
    return randomBytes(12).toString("hex");
  }

  private validate(): void {
    const result = Schema.safeParse(this);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      throw new Error(`Validation failed: ${JSON.stringify(errors, null, 2)}`);
    }
  }
}
