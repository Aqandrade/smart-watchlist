import { LoginCase, LoginSpace, LogoutCase, RegisterCase, RegisterSpace } from "../../../domain/usecases";

export interface IAuthProvider {
    children: React.ReactNode;
    remoteLogin: LoginCase;
    remoteRegister: RegisterCase;
    remoteLogout: LogoutCase;
}

export interface IAuthContext {
    isAuthenticated: boolean;
    login: (params: LoginSpace.Params) => Promise<void>;
    register: (params: RegisterSpace.Params) => Promise<RegisterSpace.Model>;
    logout: () => Promise<void>;
}
