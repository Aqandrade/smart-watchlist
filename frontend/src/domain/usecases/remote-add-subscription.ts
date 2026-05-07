import { SubscriptionModel } from "../models";

export namespace AddSubscriptionSpace {
    export interface Params {
        provider_name: string;
    }
    export interface Model extends SubscriptionModel {}
}

export interface AddSubscriptionCase {
    add: (
        params: AddSubscriptionSpace.Params
    ) => Promise<AddSubscriptionSpace.Model>;
}
