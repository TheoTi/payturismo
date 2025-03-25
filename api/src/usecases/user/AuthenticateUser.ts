import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";
import { userRepository } from "../../db/repositories/UserRepository";
import { env } from "../../config/env";

export class AuthenticateUser {
  async execute({ email, password }: IAuthenticateUserDTO) {
    const user = await userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new Error("User could not be found.");
    }

    // const passwordMatch = await compare(password, user.passwordHash);
    // if (!passwordMatch) {
    //   throw new Error("Invalid credentials.");
    // }
    if (password !== user.passwordHash) {
      throw new Error("Invalid credentials.");
    }

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  private generateToken(payload: {
    userId: string;
    email: string;
    role: string;
  }) {
    return jwt.sign(payload, env.jwtSecret, { expiresIn: "8h" });
  }
}
