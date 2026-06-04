export interface RecommendationModel {
    entity_id: string;
    movie_name: string;
    movie_description: string;
    movie_director: string;
    movie_release_date: number;
    movie_duration: number;
    external_source_rating: number;
    providers: string[];
    status: string;
}
