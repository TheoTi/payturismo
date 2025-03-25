import { Request, Response } from "express";
import { z } from "zod";

import { CreateUser } from "../../usecases/user/CreateUser";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { DeleteUser } from "../../usecases/user/DeleteUser";
import { FindUserById } from "../../usecases/user/FindUserById";
import { ListUsers } from "../../usecases/user/ListUser";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";
import { AuthenticateUser } from "../../usecases/user/AuthenticateUser";

export class UserController {
  async listUsers(req: Request, res: Response) {
    const listUsersUseCase = new ListUsers();

    const users = await listUsersUseCase.execute();

    res.status(200).json({
      data: users,
    });
  }

  async findUserById(req: Request, res: Response) {
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

    const findUserByIdUseCase = new FindUserById();

    const user = await findUserByIdUseCase.execute(id);

    res.status(200).json({
      data: user ?? {},
    });
  }

  async deleteUser(req: Request, res: Response) {
    const schema = z.object({
      id: z.string().min(2),
    });

    const { success, data, error } = schema.safeParse(req.params);

    if (!success) {
      res.status(400).json({
        error: error.issues,
      });

      return;
    }

    const { id } = data;

    const deleteUserUseCase = new DeleteUser();

    await deleteUserUseCase.execute(id);

    res.sendStatus(204);
  }

  async createUser(req: Request, res: Response) {
    const dto = req.body as ICreateUserDTO;

    const createUserUseCase = new CreateUser();

    const user = await createUserUseCase.execute(dto);

    res.status(201).json({
      data: user,
    });
  }

  async login(req: Request, res: Response) {
    const body = req.body as IAuthenticateUserDTO;

    const authenticateUserUseCase = new AuthenticateUser();

    const authentication = await authenticateUserUseCase.execute(body);

    res.status(200).json({
      data: authentication,
    });
  }
}

export const userController = new UserController();
