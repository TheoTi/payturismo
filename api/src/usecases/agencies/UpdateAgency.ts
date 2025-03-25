import { AgencyPrismaAdapter } from "../../adapters/AgencyPrismaAdapter";
import { AgencyRepository } from "../../db/repositories/AgencyRepository";
import { IUpdateAgencyDTO } from "../../dtos/IUpdateAgencyDTO";
import { Agency } from "../../entities/Agency";

export class UpdateAgency {
  async execute(id: string, dto: IUpdateAgencyDTO) {
    const agencyExists = await AgencyRepository.findById(id);

    if (!agencyExists) {
      throw new Error("Agency could not be found.");
    }

    const agencyToUpdate = {
      ...AgencyPrismaAdapter.toDomain(agencyExists),
      ...dto,
    };

    const agencyEntity = new Agency(agencyToUpdate);
    const prismaCreateInput = AgencyPrismaAdapter.toPrismaUpdate(agencyEntity);

    const agency = await AgencyRepository.update(id, prismaCreateInput);

    return agency;
  }
}
