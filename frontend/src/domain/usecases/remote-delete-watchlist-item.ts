export namespace DeleteWatchlistItemSpace {
    export interface Params {
        entity_id: string;
    }
}

export interface DeleteWatchlistItemCase {
    delete: (params: DeleteWatchlistItemSpace.Params) => Promise<void>;
}
