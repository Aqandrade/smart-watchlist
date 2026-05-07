export namespace UpdateSubscriptionStatusSpace {
    export interface Params {
        entity_id: string;
        active: boolean;
    }
}

export interface UpdateSubscriptionStatusCase {
    update: (params: UpdateSubscriptionStatusSpace.Params) => Promise<void>;
}
