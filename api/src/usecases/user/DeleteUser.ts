import { userRepository } from "../../db/repositories/UserRepository";

export class DeleteUser {
  async execute(id: string) {
    return userRepository.delete(id);
  }
}
