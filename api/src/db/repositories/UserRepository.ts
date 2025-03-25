import { Prisma, User } from "@prisma/client";
import { IUserRepository } from "../../interfaces/repository/IUserRepository";
import { dbConnection } from "..";

class Repository implements IUserRepository<User> {
  async findAll() {
    return dbConnection.user.findMany();
  }

  async findById(id: string) {
    return dbConnection.user.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const user = await dbConnection.user.findFirst({
      where: {
        id,
      },
    });

    if (user) {
      await dbConnection.user.delete({
        where: {
          id,
        },
      });
    }
  }

  async create(dto: Prisma.UserCreateInput) {
    return dbConnection.user.create({
      data: dto,
    });
  }

  async update(id: string, dto: Prisma.UserUpdateInput) {
    return dbConnection.user.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}

export const userRepository = new Repository();
