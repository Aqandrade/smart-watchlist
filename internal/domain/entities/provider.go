package entities

import "time"

type Provider struct {
	ID        int
	EntityID  string
	Name      string
	CreatedAt time.Time
	UpdatedAt time.Time
}
