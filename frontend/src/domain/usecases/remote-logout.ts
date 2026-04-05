import { LogoutDTO } from "../dtos";

export namespace LogoutSpace {
    export interface Params extends LogoutDTO {}
}

export interface LogoutCase {
    logout: (params: LogoutSpace.Params) => Promise<void>;
}
