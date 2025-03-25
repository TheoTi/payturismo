import { Prisma, Agency as PrismaAgency } from "@prisma/client";
import { Agency } from "../entities/Agency";

export class AgencyPrismaAdapter {
  public static toPrisma(agency: Agency): Prisma.AgencyCreateInput {
    return {
      id: agency.id,
      fantasyName: agency.fantasyName,
      corporateName: agency.corporateName,
      cnpj: agency.cnpj,
      stateRegistration: agency.stateRegistration,
      municipalRegistration: agency.municipalRegistration,
      status: agency.status,
      foundationDate: agency.foundationDate,
      email: agency.email,
      phone: agency.phone,
      website: agency.website,
      createdAt: agency.createdAt,
      updatedAt: agency.updatedAt,
    };
  }

  public static toDomain(prismaAgency: PrismaAgency): Agency {
    return new Agency({
      id: prismaAgency.id,
      fantasyName: prismaAgency.fantasyName,
      corporateName: prismaAgency.corporateName,
      cnpj: prismaAgency.cnpj,
      stateRegistration: prismaAgency.stateRegistration || undefined,
      municipalRegistration: prismaAgency.municipalRegistration || undefined,
      status: prismaAgency.status,
      foundationDate: prismaAgency.foundationDate || undefined,
      email: prismaAgency.email,
      phone: prismaAgency.phone,
      website: prismaAgency?.website || undefined,
    });
  }
}
