import { Prisma, User as PrismaUser } from "@prisma/client";
import { User } from "../entities/User";

export class UserPrismaAdapter {
  public static toPrisma(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static toDomain(prismaUser: PrismaUser): User {
    return new User({
      id: prismaUser.id,
      email: prismaUser.email,
      password: prismaUser.passwordHash,
      role: prismaUser.role,
    });
  }

  public static toPrismaUpdate(user: Partial<User>): Prisma.UserUpdateInput {
    return {
      email: user.email,
      passwordHash: user.password,
      role: user.role,
      updatedAt: new Date(),
    };
  }
}
