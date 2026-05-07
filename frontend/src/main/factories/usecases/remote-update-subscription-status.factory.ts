import { RemoteUpdateSubscriptionStatus } from "../../../data/usecases";
import { UpdateSubscriptionStatusCase } from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteUpdateSubscriptionStatus = (): UpdateSubscriptionStatusCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/subscriptions`;

    const axiosHttpClientAdapter = makeAxiosHttpClientAdapter<void>();

    return new RemoteUpdateSubscriptionStatus(axiosHttpClientAdapter, url);
};
