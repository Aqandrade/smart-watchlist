import { RemoteAddSubscription } from "../../../data/usecases";
import {
    AddSubscriptionCase,
    AddSubscriptionSpace,
} from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteAddSubscription = (): AddSubscriptionCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/subscriptions`;

    const axiosHttpClientAdapter =
        makeAxiosHttpClientAdapter<AddSubscriptionSpace.Model>();

    return new RemoteAddSubscription(axiosHttpClientAdapter, url);
};
