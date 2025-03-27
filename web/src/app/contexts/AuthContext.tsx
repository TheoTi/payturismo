import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { storageKeys } from "../config/storageKeys";
import AuthService, { type ISignInDTO } from "../services/AuthService";

export type TUserRole = "admin" | "analyst";

export interface IAuthUser {
  id: string;
  email: string;
  role: TUserRole;
}

interface IAuthContextValue {
  user: null | IAuthUser;
  signedIn: boolean;
  signIn(signInDTO: ISignInDTO): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: PropsWithChildren) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    return !!localStorage.getItem(storageKeys.accessToken);
  });
  const [user, setUser] = useState<null | IAuthUser>(() => {
    const storagedUser = localStorage.getItem(storageKeys.user);

    return storagedUser && JSON.parse(storagedUser ? storagedUser : "{}");
  });

  const signIn = useCallback(async ({ email, password }: ISignInDTO) => {
    const authentication = await AuthService.signIn({
      email,
      password,
    });

    console.log({ authentication });

    localStorage.setItem(storageKeys.accessToken, authentication.token);
    localStorage.setItem(storageKeys.user, JSON.stringify(authentication.user));

    setUser(user);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    setSignedIn(false);
    setUser(null);
  }, []);

  const value: IAuthContextValue = useMemo(
    () => ({
      user,
      signedIn,
      signIn,
      signOut,
    }),
    [user, signedIn, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
