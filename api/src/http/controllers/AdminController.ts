import { Request, Response } from "express";
import { ListAgencies } from "../../usecases/agencies/ListAgencies";

export class AdminController {
  static async listAgencies(req: Request, res: Response) {
    const litAgenciesUseCase = new ListAgencies();

    const agencies = await litAgenciesUseCase.execute();

    res.status(200).json({
      data: agencies,
    });
  }
}
