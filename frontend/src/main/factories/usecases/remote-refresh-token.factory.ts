import { RemoteRefreshToken } from "../../../data/usecases";
import { RefreshTokenCase, RefreshTokenSpace } from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteRefreshToken = (): RefreshTokenCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/auth/refresh`;

    const axiosHttpClientAdapter =
        makeAxiosHttpClientAdapter<RefreshTokenSpace.Model>();

    const remoteRefreshToken = new RemoteRefreshToken(
        axiosHttpClientAdapter,
        url
    );

    return remoteRefreshToken;
};
