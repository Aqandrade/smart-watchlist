import { SubscriptionListModel } from "../models";

export namespace ListSubscriptionsSpace {
    export interface Params {
        active?: boolean;
    }
    export interface Model extends SubscriptionListModel {}
}

export interface ListSubscriptionsCase {
    list: (
        params?: ListSubscriptionsSpace.Params
    ) => Promise<ListSubscriptionsSpace.Model>;
}
