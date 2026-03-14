package entities

import "time"

type MovieWatchProvider struct {
	ID         int
	EntityID   string
	MovieID    int
	ProviderID int
	CreatedAt  time.Time
	UpdatedAt  time.Time
}
