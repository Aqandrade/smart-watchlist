import { ListWatchlistDTO } from "../dtos";
import { WatchlistModel } from "../models";

export namespace ListWatchlistSpace {
    export interface Params extends ListWatchlistDTO {}
    export interface Model extends WatchlistModel {}
}

export interface ListWatchlistCase {
    list: (
        params?: ListWatchlistSpace.Params
    ) => Promise<ListWatchlistSpace.Model>;
}
