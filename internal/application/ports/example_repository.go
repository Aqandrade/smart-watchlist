package ports

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type ExampleRepository interface {
	Create(ctx context.Context, example *entities.Example) error
}
