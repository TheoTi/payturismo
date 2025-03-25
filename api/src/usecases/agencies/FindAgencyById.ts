import { AgencyRepository } from "../../db/repositories/AgencyRepository";

export class FindAgencyById {
  async execute(id: string) {
    return AgencyRepository.findById(id);
  }
}
