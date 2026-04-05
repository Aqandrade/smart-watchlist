package entities

import "time"

type RefreshToken struct {
	ID        int
	EntityID  string
	UserID    int
	TokenHash string
	ExpiresAt time.Time
	CreatedAt time.Time
}
