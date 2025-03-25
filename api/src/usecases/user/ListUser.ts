import { userRepository } from "../../db/repositories/UserRepository";

export class ListUsers {
  async execute() {
    const users = await userRepository.findAll();

    return users;
  }
}
