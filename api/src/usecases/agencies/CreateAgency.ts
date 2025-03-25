import { AgencyPrismaAdapter } from "../../adapters/AgencyPrismaAdapter";
import { AgencyRepository } from "../../db/repositories/AgencyRepository";
import { ICreateAgencyDTO } from "../../dtos/ICreateAgencyDTO";
import { Agency } from "../../entities/Agency";

export class CreateAgency {
  async execute(dto: ICreateAgencyDTO) {
    const agencyEntity = new Agency(dto);
    const prismaCreateInput = AgencyPrismaAdapter.toPrisma(agencyEntity);

    const agency = await AgencyRepository.create(prismaCreateInput);

    return agency;
  }
}
