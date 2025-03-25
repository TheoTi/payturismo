import { randomBytes } from "node:crypto";
import { merge } from "lodash";
import { AgencySchema } from "../validators/createAgencyZodSchema";

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
    const result = AgencySchema.safeParse(this);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      throw new Error(`Validation failed: ${JSON.stringify(errors, null, 2)}`);
    }
  }
}
