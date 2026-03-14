export interface WatchlistItemModel {
    entity_id: string;
    movie_name: string;
    movie_description: string;
    movie_director: string;
    movie_release_date: number;
    movie_duration: number;
    external_source_rating: number;
    status: string;
    providers: string[];
    created_at: string;
}
