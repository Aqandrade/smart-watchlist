package entities

import "time"

type User struct {
	ID           int
	EntityID     string
	Name         string
	Username     string
	Email        string
	PasswordHash string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
