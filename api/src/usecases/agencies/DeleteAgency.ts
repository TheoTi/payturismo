import { AgencyRepository } from "../../db/repositories/AgencyRepository";

export class DeleteAgency {
  async execute(id: string) {
    return AgencyRepository.delete(id);
  }
}
