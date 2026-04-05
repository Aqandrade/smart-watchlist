import { RemoteRegister } from "../../../data/usecases";
import { RegisterCase, RegisterSpace } from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteRegister = (): RegisterCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/auth/register`;

    const axiosHttpClientAdapter =
        makeAxiosHttpClientAdapter<RegisterSpace.Model>();

    const remoteRegister = new RemoteRegister(axiosHttpClientAdapter, url);

    return remoteRegister;
};
