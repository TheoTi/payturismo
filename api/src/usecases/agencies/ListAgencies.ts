import { AgencyRepository } from "../../db/repositories/AgencyRepository";

export class ListAgencies {
  async execute() {
    const agencies = await AgencyRepository.findAll();

    return agencies;
  }
}
