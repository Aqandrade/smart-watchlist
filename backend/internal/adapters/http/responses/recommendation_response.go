package responses

type RecommendationResponse struct {
	EntityID             string   `json:"entity_id"`
	MovieName            string   `json:"movie_name"`
	MovieDescription     string   `json:"movie_description"`
	MovieDirector        string   `json:"movie_director"`
	MovieReleaseDate     int16    `json:"movie_release_date"`
	MovieDuration        int16    `json:"movie_duration"`
	ExternalSourceRating float64  `json:"external_source_rating"`
	Providers            []string `json:"providers"`
	Status               string   `json:"status"`
}
