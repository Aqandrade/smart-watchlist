import { Navigate } from "react-router-dom";
import { useAuth } from "../../presentation/contexts/auth/auth.context";

interface IPrivateRoute {
    children: React.ReactElement;
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
