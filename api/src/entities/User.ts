import { randomBytes } from "node:crypto";
import { merge } from "lodash";
import { UserSchema } from "../validators/createUserZodSchema";

export class User implements UserSchema {
  public id: string;
  public email: string;
  public password: string;
  public role: "admin" | "analyst";
  public createdAt: Date;
  public updatedAt?: Date;

  constructor(data: UserSchema) {
    this.id = data.id || this.generateUlid();
    this.email = "";
    this.password = "";
    this.role = "analyst";
    this.createdAt = new Date();

    merge(this, data);

    this.validate();
  }

  private generateUlid(): string {
    return randomBytes(12).toString("hex");
  }

  private validate(): void {
    const result = UserSchema.safeParse(this);

    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      throw new Error(`Validation failed: ${JSON.stringify(errors, null, 2)}`);
    }
  }
}
