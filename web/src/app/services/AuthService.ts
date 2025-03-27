import { env } from "../config/env";
import { HttpClient } from "./utils/HttpClient";

export interface ISignInDTO {
  email: string;
  password: string;
}

interface ISignUpDTO {
  email: string;
  password: string;
  username: string;
}

interface ISignInResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
}

class AuthService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(env.baseApiURL);
  }

  async signIn({ email, password }: ISignInDTO) {
    const { data } = await this.httpClient.post<ISignInResponse>("/login/:", {
      data: {
        email,
        password,
      },
    });

    return {
      token: data.token,
      user: data.user,
    };
  }

  async signUp({ email, username, password }: ISignUpDTO) {
    return this.httpClient.post("/users/sign-up", {
      data: {
        email,
        username,
        password,
      },
    });
  }
}

export default new AuthService();
