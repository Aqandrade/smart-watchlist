export namespace UpdateWatchlistItemStatusSpace {
    export interface Params {
        entity_id: string;
        status: string;
    }
    export interface Model {}
}

export interface UpdateWatchlistItemStatusCase {
    update: (
        params: UpdateWatchlistItemStatusSpace.Params
    ) => Promise<void>;
}
