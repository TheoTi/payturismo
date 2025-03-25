import { UserPrismaAdapter } from "../../adapters/UserPrismaAdapter";
import { userRepository } from "../../db/repositories/UserRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";

export class CreateUser {
  async execute(dto: ICreateUserDTO) {
    const userEntity = new User(dto);
    const prismaCreateInput = UserPrismaAdapter.toPrisma(userEntity);

    const user = await userRepository.create(prismaCreateInput);

    return user;
  }
}
