package responses

import "time"

type WatchlistResponse struct {
	EntityID  string    `json:"entity_id"`
	MovieName string    `json:"movie_name"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

type UpdateWatchlistItemStatusResponse struct {
	EntityID  string    `json:"entity_id"`
	Status    string    `json:"status"`
	UpdatedAt time.Time `json:"updated_at"`
}
