package handlers

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/requests"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/responses"
	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type AuthHandler struct {
	registerUseCase     *usecases.RegisterUserUseCase
	loginUseCase        *usecases.LoginUserUseCase
	refreshTokenUseCase *usecases.RefreshTokenUseCase
	logoutUseCase       *usecases.LogoutUserUseCase
}

func NewAuthHandler(
	registerUseCase *usecases.RegisterUserUseCase,
	loginUseCase *usecases.LoginUserUseCase,
	refreshTokenUseCase *usecases.RefreshTokenUseCase,
	logoutUseCase *usecases.LogoutUserUseCase,
) *AuthHandler {
	return &AuthHandler{
		registerUseCase:     registerUseCase,
		loginUseCase:        loginUseCase,
		refreshTokenUseCase: refreshTokenUseCase,
		logoutUseCase:       logoutUseCase,
	}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req requests.RegisterUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.registerUseCase.Execute(c.Request.Context(), usecases.RegisterUserInput{
		Name:            req.Name,
		Username:        req.Username,
		Email:           req.Email,
		Password:        req.Password,
		ConfirmPassword: req.ConfirmPassword,
	})
	if err != nil {
		c.JSON(mapAuthErrorToStatus(err), gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, responses.RegisterUserResponse{
		EntityID:  user.EntityID,
		Name:      user.Name,
		Username:  user.Username,
		Email:     user.Email,
		CreatedAt: user.CreatedAt,
	})
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req requests.LoginUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	accessToken, refreshToken, err := h.loginUseCase.Execute(c.Request.Context(), usecases.LoginUserInput{
		Username: req.Username,
		Password: req.Password,
	})
	if err != nil {
		c.JSON(mapAuthErrorToStatus(err), gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, responses.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}

func (h *AuthHandler) Refresh(c *gin.Context) {
	var req requests.RefreshTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	accessToken, refreshToken, err := h.refreshTokenUseCase.Execute(c.Request.Context(), req.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, responses.LoginResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	})
}

func (h *AuthHandler) Logout(c *gin.Context) {
	var req requests.RefreshTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.logoutUseCase.Execute(c.Request.Context(), req.RefreshToken); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}

func mapAuthErrorToStatus(err error) int {
	switch {
	case errors.Is(err, entities.ErrUserAlreadyExists):
		return http.StatusConflict
	case errors.Is(err, entities.ErrInvalidCredentials), errors.Is(err, entities.ErrInvalidToken):
		return http.StatusUnauthorized
	case errors.Is(err, entities.ErrWeakPassword), errors.Is(err, entities.ErrPasswordMismatch):
		return http.StatusBadRequest
	default:
		return http.StatusInternalServerError
	}
}
