import { Agency } from "@prisma/client";
import { IAgencyRepository } from "../../interfaces/IAgencyRepository";
import { dbConnection } from "..";

class Repository implements IAgencyRepository<Agency> {
  async findAll() {
    const agencies = await dbConnection.agency.findMany();

    return agencies;
  }
}

export const AgencyRepository = new Repository();
