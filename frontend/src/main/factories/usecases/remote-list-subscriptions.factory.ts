import { RemoteListSubscriptions } from "../../../data/usecases";
import {
    ListSubscriptionsCase,
    ListSubscriptionsSpace,
} from "../../../domain/usecases";
import { makeAxiosHttpClientAdapter } from "../http";

export const makeRemoteListSubscriptions = (): ListSubscriptionsCase => {
    const url = `${process.env.REACT_APP_SMART_WATCHLIST_API_URL}/v1/subscriptions`;

    const axiosHttpClientAdapter =
        makeAxiosHttpClientAdapter<ListSubscriptionsSpace.Model>();

    return new RemoteListSubscriptions(axiosHttpClientAdapter, url);
};
