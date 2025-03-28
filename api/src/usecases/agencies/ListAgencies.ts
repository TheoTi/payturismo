import { AgencyRepository } from "../../db/repositories/AgencyRepository";

interface IListAgenciesRequest {
  search: string;
  [field: string]: string;
}

export class ListAgencies {
  async execute({ search = "", status = "" }: IListAgenciesRequest) {
    const agencies = await AgencyRepository.findAll({
      search,
      status,
    });

    return agencies;
  }
}
