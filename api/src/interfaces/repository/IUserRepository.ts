import { Prisma, User } from "@prisma/client";

export interface IUserRepository<T = any> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  delete(id: string): Promise<void>;
  create(dto: Prisma.UserCreateInput): Promise<T>;
  update(id: string, dto: Prisma.UserUpdateInput): Promise<T>;

  findOneBy<K extends Partial<Record<keyof Prisma.UserWhereInput, any>>>(
    search: K
  ): Promise<T | null>;
}
