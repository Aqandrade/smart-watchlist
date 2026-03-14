package ports

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type ProviderRepository interface {
	FindByName(ctx context.Context, name string) (*entities.Provider, error)
}
