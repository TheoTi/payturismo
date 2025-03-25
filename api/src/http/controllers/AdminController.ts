import { Request, Response } from "express";
import { z } from "zod";

import { ListAgencies } from "../../usecases/agencies/ListAgencies";
import { FindAgencyById } from "../../usecases/agencies/FindAgencyById";
import { DeleteAgency } from "../../usecases/agencies/DeleteAgency";
import { CreateAgency } from "../../usecases/agencies/CreateAgency";
import { ICreateAgencyDTO } from "../../dtos/ICreateAgencyDTO";
import { IUpdateAgencyDTO } from "../../dtos/IUpdateAgencyDTO";
import { UpdateAgency } from "../../usecases/agencies/UpdateAgency";

export class AdminController {
  async listAgencies(req: Request, res: Response) {
    const litAgenciesUseCase = new ListAgencies();

    const agencies = await litAgenciesUseCase.execute();

    res.status(200).json({
      data: agencies,
    });
  }

  async findAgencyById(req: Request, res: Response) {
    const schema = z.object({
      id: z.string().min(1),
    });

    const { success, data, error } = schema.safeParse(req.params);

    if (!success) {
      res.status(400).json({
        error: error.issues,
      });

      return;
    }

    const { id } = data;

    const findAgencyByIdUseCase = new FindAgencyById();

    const agency = await findAgencyByIdUseCase.execute(id);

    res.status(200).json({
      data: agency ?? {},
    });
  }

  async deleteAgency(req: Request, res: Response) {
    const schema = z.object({
      id: z.string().min(1),
    });

    const { success, data, error } = schema.safeParse(req.params);

    if (!success) {
      res.status(400).json({
        error: error.issues,
      });

      return;
    }

    const { id } = data;

    const deleteAgencyUseCase = new DeleteAgency();

    const agency = await deleteAgencyUseCase.execute(id);

    res.sendStatus(204);
  }

  async createAgency(req: Request, res: Response) {
    const { body } = req;

    const createAgencyUseCase = new CreateAgency();

    const agency = await createAgencyUseCase.execute(body as ICreateAgencyDTO);

    res.status(201).json({
      data: agency,
    });
  }

  async updateAgency(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body as IUpdateAgencyDTO;

    const updateAgencyUseCase = new UpdateAgency();

    const agency = await updateAgencyUseCase.execute(id, body);

    res.status(200).json({
      data: agency,
    });
  }
}

export const adminController = new AdminController();
