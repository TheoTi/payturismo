import { userRepository } from "../../db/repositories/UserRepository";

export class FindUserById {
  async execute(id: string) {
    return userRepository.findById(id);
  }
}
