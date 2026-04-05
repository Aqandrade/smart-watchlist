import { Login } from "../../../presentation/pages/login/login";
import { makeRemoteLogin } from "../usecases";

export const makeLoginPage = () => {
    return <Login remoteLogin={makeRemoteLogin()} />;
};
