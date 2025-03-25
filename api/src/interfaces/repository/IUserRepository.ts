import { Prisma, User } from "@prisma/client";

export interface IUserRepository<T = any> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
  create(dto: Prisma.UserCreateInput): Promise<User>;
  update(id: string, dto: Prisma.UserUpdateInput): Promise<User>;
}
