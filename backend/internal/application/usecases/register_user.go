package usecases

import (
	"context"
	"errors"
	"unicode"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type RegisterUserInput struct {
	Name            string
	Username        string
	Email           string
	Password        string
	ConfirmPassword string
}

type RegisterUserUseCase struct {
	userRepo ports.UserRepository
}

func NewRegisterUserUseCase(userRepo ports.UserRepository) *RegisterUserUseCase {
	return &RegisterUserUseCase{userRepo: userRepo}
}

func (uc *RegisterUserUseCase) Execute(ctx context.Context, input RegisterUserInput) (*entities.User, error) {
	if input.Password != input.ConfirmPassword {
		return nil, entities.ErrPasswordMismatch
	}

	if err := validatePassword(input.Password); err != nil {
		return nil, err
	}

	_, err := uc.userRepo.FindByEmail(ctx, input.Email)
	if err == nil {
		return nil, entities.ErrUserAlreadyExists
	}
	if !errors.Is(err, entities.ErrUserNotFound) {
		return nil, err
	}

	_, err = uc.userRepo.FindByUsername(ctx, input.Username)
	if err == nil {
		return nil, entities.ErrUserAlreadyExists
	}
	if !errors.Is(err, entities.ErrUserNotFound) {
		return nil, err
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	user := &entities.User{
		EntityID:     uuid.NewString(),
		Name:         input.Name,
		Username:     input.Username,
		Email:        input.Email,
		PasswordHash: string(hash),
	}

	return uc.userRepo.Create(ctx, user)
}

func validatePassword(password string) error {
	if len(password) < 8 {
		return entities.ErrWeakPassword
	}

	var hasUpper, hasLower, hasDigit, hasSpecial bool
	for _, r := range password {
		switch {
		case unicode.IsUpper(r):
			hasUpper = true
		case unicode.IsLower(r):
			hasLower = true
		case unicode.IsDigit(r):
			hasDigit = true
		case unicode.IsPunct(r) || unicode.IsSymbol(r):
			hasSpecial = true
		}
	}

	if !hasUpper || !hasLower || !hasDigit || !hasSpecial {
		return entities.ErrWeakPassword
	}

	return nil
}
