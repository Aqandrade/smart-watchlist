import { RefreshTokenDTO } from "../dtos";
import { AuthRefreshTokenResponseModel } from "../models";

export namespace RefreshTokenSpace {
    export interface Params extends RefreshTokenDTO {}
    export interface Model extends AuthRefreshTokenResponseModel {}
}

export interface RefreshTokenCase {
    refresh: (params: RefreshTokenSpace.Params) => Promise<RefreshTokenSpace.Model>;
}
