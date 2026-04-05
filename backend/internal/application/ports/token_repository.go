package ports

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type TokenRepository interface {
	Save(ctx context.Context, token *entities.RefreshToken) error
	FindByTokenHash(ctx context.Context, tokenHash string) (*entities.RefreshToken, error)
	DeleteByTokenHash(ctx context.Context, tokenHash string) error
	DeleteAllByUserID(ctx context.Context, userID int) error
}
