import { Prisma, Agency } from "@prisma/client";

export interface IAgencyRepository<T = any> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
  create(dto: Prisma.AgencyCreateInput): Promise<Agency>;
  update(id: string, dto: Prisma.AgencyUpdateInput): Promise<Agency>;
}
