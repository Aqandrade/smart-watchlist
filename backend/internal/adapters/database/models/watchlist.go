package models

import "time"

type Watchlist struct {
	ID        int
	EntityID  string
	MovieID   int
	UserID    int
	Status    string
	CreatedAt time.Time
	UpdatedAt time.Time
}
