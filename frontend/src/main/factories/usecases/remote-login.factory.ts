import { RemoteLogin } from "../../../data/usecases";
import { LoginCase, LoginSpace } from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteLogin = (): LoginCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/auth/login`;

    const axiosHttpClientAdapter =
        makeAxiosHttpClientAdapter<LoginSpace.Model>();

    const remoteLogin = new RemoteLogin(axiosHttpClientAdapter, url);

    return remoteLogin;
};
