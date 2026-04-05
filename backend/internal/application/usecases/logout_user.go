package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type LogoutUserUseCase struct {
	tokenRepo     ports.TokenRepository
	tokenProvider ports.TokenProvider
}

func NewLogoutUserUseCase(
	tokenRepo ports.TokenRepository,
	tokenProvider ports.TokenProvider,
) *LogoutUserUseCase {
	return &LogoutUserUseCase{
		tokenRepo:     tokenRepo,
		tokenProvider: tokenProvider,
	}
}

func (uc *LogoutUserUseCase) Execute(ctx context.Context, refreshToken string) error {
	tokenHash := uc.tokenProvider.HashToken(refreshToken)

	if err := uc.tokenRepo.DeleteByTokenHash(ctx, tokenHash); err != nil {
		return entities.ErrInvalidToken
	}

	return nil
}
