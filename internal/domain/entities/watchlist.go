package entities

import "time"

type WatchlistStatus string

const (
	WatchlistStatusPending WatchlistStatus = "PENDING"
	WatchlistStatusWatched WatchlistStatus = "WATCHED"
)

type Watchlist struct {
	ID        int
	EntityID  string
	MovieID   int
	UserID    int
	Status    WatchlistStatus
	CreatedAt time.Time
	UpdatedAt time.Time
}
