import { RemoteLogout } from "../../../data/usecases";
import { LogoutCase } from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteLogout = (): LogoutCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/auth/logout`;

    const axiosHttpClientAdapter = makeAxiosHttpClientAdapter<void>();

    const remoteLogout = new RemoteLogout(axiosHttpClientAdapter, url);

    return remoteLogout;
};
