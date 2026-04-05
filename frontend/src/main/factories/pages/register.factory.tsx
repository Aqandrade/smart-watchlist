import { Register } from "../../../presentation/pages/register/register";
import { makeRemoteRegister } from "../usecases";

export const makeRegisterPage = () => {
    return <Register remoteRegister={makeRemoteRegister()} />;
};
