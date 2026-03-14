package responses

import "time"

type WatchlistItemResponse struct {
	EntityID             string    `json:"entity_id"`
	MovieName            string    `json:"movie_name"`
	MovieDescription     string    `json:"movie_description"`
	MovieDirector        string    `json:"movie_director"`
	MovieReleaseDate     int16     `json:"movie_release_date"`
	MovieDuration        int16     `json:"movie_duration"`
	ExternalSourceRating float64   `json:"external_source_rating"`
	Status               string    `json:"status"`
	Providers            []string  `json:"providers"`
	CreatedAt            time.Time `json:"created_at"`
}

type ListWatchlistResponse struct {
	Items      []WatchlistItemResponse `json:"items"`
	Page       int                     `json:"page"`
	PageSize   int                     `json:"page_size"`
	TotalItems int                     `json:"total_items"`
}
