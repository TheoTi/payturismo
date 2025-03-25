import { Request, Response } from "express";
import { z } from "zod";

import { ListAgencies } from "../../usecases/agencies/ListAgencies";
import { FindAgencyById } from "../../usecases/agencies/FindAgencyById";

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
}

export const adminController = new AdminController();
