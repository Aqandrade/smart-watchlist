import { RegisterDTO } from "../dtos";
import { AuthRegisterResponseModel } from "../models";

export namespace RegisterSpace {
    export interface Params extends RegisterDTO {}
    export interface Model extends AuthRegisterResponseModel {}
}

export interface RegisterCase {
    register: (params: RegisterSpace.Params) => Promise<RegisterSpace.Model>;
}
