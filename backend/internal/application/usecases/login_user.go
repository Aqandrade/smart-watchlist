package usecases

import (
	"context"
	"errors"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type LoginUserInput struct {
	Username string
	Password string
}

type LoginUserUseCase struct {
	userRepo      ports.UserRepository
	tokenRepo     ports.TokenRepository
	tokenProvider ports.TokenProvider
}

func NewLoginUserUseCase(
	userRepo ports.UserRepository,
	tokenRepo ports.TokenRepository,
	tokenProvider ports.TokenProvider,
) *LoginUserUseCase {
	return &LoginUserUseCase{
		userRepo:      userRepo,
		tokenRepo:     tokenRepo,
		tokenProvider: tokenProvider,
	}
}

func (uc *LoginUserUseCase) Execute(ctx context.Context, input LoginUserInput) (accessToken, refreshToken string, err error) {
	user, err := uc.userRepo.FindByUsername(ctx, input.Username)
	if errors.Is(err, entities.ErrUserNotFound) {
		return "", "", entities.ErrInvalidCredentials
	}
	if err != nil {
		return "", "", err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password)); err != nil {
		return "", "", entities.ErrInvalidCredentials
	}

	accessToken, err = uc.tokenProvider.GenerateAccessToken(user.ID)
	if err != nil {
		return "", "", err
	}

	refreshToken, err = uc.tokenProvider.GenerateRefreshToken()
	if err != nil {
		return "", "", err
	}

	token := &entities.RefreshToken{
		EntityID:  uuid.NewString(),
		UserID:    user.ID,
		TokenHash: uc.tokenProvider.HashToken(refreshToken),
		ExpiresAt: uc.tokenProvider.RefreshTokenExpiry(),
	}

	if err := uc.tokenRepo.Save(ctx, token); err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}
