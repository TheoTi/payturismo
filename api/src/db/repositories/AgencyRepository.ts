import { Agency } from "@prisma/client";
import { IAgencyRepository } from "../../interfaces/IAgencyRepository";
import { dbConnection } from "..";

class Repository implements IAgencyRepository<Agency> {
  async findAll() {
    return dbConnection.agency.findMany();
  }

  async findById(id: string) {
    return dbConnection.agency.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const agency = await dbConnection.agency.findFirst({
      where: {
        id,
      },
    });

    if (agency) {
      await dbConnection.agency.delete({
        where: {
          id,
        },
      });
    }
  }
}

export const AgencyRepository = new Repository();
