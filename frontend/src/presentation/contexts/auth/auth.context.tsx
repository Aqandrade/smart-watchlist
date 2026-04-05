import { createContext, useContext, useState } from "react";
import { LoginSpace, RegisterSpace } from "../../../domain/usecases";
import { IAuthContext, IAuthProvider } from "./auth.types";

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<IAuthProvider> = ({
    children,
    remoteLogin,
    remoteRegister,
    remoteLogout,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("access_token")
    );

    const login = async (params: LoginSpace.Params): Promise<void> => {
        const response = await remoteLogin.login(params);
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        setIsAuthenticated(true);
    };

    const register = async (
        params: RegisterSpace.Params
    ): Promise<RegisterSpace.Model> => {
        return remoteRegister.register(params);
    };

    const logout = async (): Promise<void> => {
        const refreshToken = localStorage.getItem("refresh_token");

        try {
            if (refreshToken) {
                await remoteLogout.logout({ refresh_token: refreshToken });
            }
        } finally {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
