import { Agency, Prisma } from "@prisma/client";
import {
  IAgencyRepository,
  IFindOptions,
} from "../../interfaces/repository/IAgencyRepository";
import { dbConnection } from "..";
import { AGENCY_STATUS } from "../../constants/agencyStatus";

class Repository implements IAgencyRepository<Agency> {
  async findAll(options: IFindOptions) {
    const { search = "", status = null } = options;

    console.log(search, status);

    const filters: any = {};

    if (search) {
      filters.OR = [
        { fantasyName: { contains: search as string } },
        { corporateName: { contains: search as string } },
        { cnpj: { contains: search as string } },
        { email: { contains: search as string } },
        { phone: { contains: search as string } },
      ];
    }

    if (
      status &&
      AGENCY_STATUS.includes(status as (typeof AGENCY_STATUS)[number])
    ) {
      filters.status = status as (typeof AGENCY_STATUS)[number];
    }

    console.log(filters);

    return dbConnection.agency.findMany({
      where: filters,
    });
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

  async create(dto: Prisma.AgencyCreateInput) {
    return dbConnection.agency.create({
      data: dto,
    });
  }

  async update(id: string, dto: Prisma.AgencyUpdateInput) {
    return dbConnection.agency.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}

export const AgencyRepository = new Repository();
