import { WatchlistItemModel } from "./watchlist-item-model";

export interface WatchlistModel {
    items: WatchlistItemModel[];
    page: number;
    page_size: number;
    total_items: number;
}
