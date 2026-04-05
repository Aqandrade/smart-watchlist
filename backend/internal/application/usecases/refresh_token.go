package usecases

import (
	"context"
	"time"

	"github.com/google/uuid"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type RefreshTokenUseCase struct {
	tokenRepo     ports.TokenRepository
	tokenProvider ports.TokenProvider
}

func NewRefreshTokenUseCase(
	tokenRepo ports.TokenRepository,
	tokenProvider ports.TokenProvider,
) *RefreshTokenUseCase {
	return &RefreshTokenUseCase{
		tokenRepo:     tokenRepo,
		tokenProvider: tokenProvider,
	}
}

func (uc *RefreshTokenUseCase) Execute(ctx context.Context, refreshToken string) (accessToken, newRefreshToken string, err error) {
	tokenHash := uc.tokenProvider.HashToken(refreshToken)

	stored, err := uc.tokenRepo.FindByTokenHash(ctx, tokenHash)
	if err != nil {
		return "", "", entities.ErrInvalidToken
	}

	if time.Now().After(stored.ExpiresAt) {
		_ = uc.tokenRepo.DeleteByTokenHash(ctx, tokenHash)
		return "", "", entities.ErrInvalidToken
	}

	if err := uc.tokenRepo.DeleteByTokenHash(ctx, tokenHash); err != nil {
		return "", "", err
	}

	accessToken, err = uc.tokenProvider.GenerateAccessToken(stored.UserID)
	if err != nil {
		return "", "", err
	}

	newRefreshToken, err = uc.tokenProvider.GenerateRefreshToken()
	if err != nil {
		return "", "", err
	}

	newToken := &entities.RefreshToken{
		EntityID:  uuid.NewString(),
		UserID:    stored.UserID,
		TokenHash: uc.tokenProvider.HashToken(newRefreshToken),
		ExpiresAt: uc.tokenProvider.RefreshTokenExpiry(),
	}

	if err := uc.tokenRepo.Save(ctx, newToken); err != nil {
		return "", "", err
	}

	return accessToken, newRefreshToken, nil
}
