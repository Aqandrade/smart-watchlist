package entities

import (
	"time"

	"github.com/google/uuid"
)

type Example struct {
	ID        uuid.UUID
	Name      string
	CreatedAt time.Time
}

func NewExample(name string) *Example {
	return &Example{
		ID:        uuid.New(),
		Name:      name,
		CreatedAt: time.Now(),
	}
}
