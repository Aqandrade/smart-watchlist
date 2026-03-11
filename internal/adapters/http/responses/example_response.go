package responses

import (
	"time"

	"github.com/google/uuid"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type ExampleResponse struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
}

func ToExampleResponse(e *entities.Example) ExampleResponse {
	return ExampleResponse{
		ID:        e.ID,
		Name:      e.Name,
		CreatedAt: e.CreatedAt,
	}
}
