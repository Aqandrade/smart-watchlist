import { LoginDTO } from "../dtos";
import { AuthLoginResponseModel } from "../models";

export namespace LoginSpace {
    export interface Params extends LoginDTO {}
    export interface Model extends AuthLoginResponseModel {}
}

export interface LoginCase {
    login: (params: LoginSpace.Params) => Promise<LoginSpace.Model>;
}
