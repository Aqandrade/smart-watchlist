package jwt

import (
	"crypto/sha256"
	"encoding/hex"
	"time"

	gojwt "github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

const (
	accessTokenExpiry  = 15 * time.Minute
	refreshTokenExpiry = 7 * 24 * time.Hour
)

type claims struct {
	UserID int `json:"user_id"`
	gojwt.RegisteredClaims
}

type tokenProvider struct {
	secret []byte
}

func NewTokenProvider(secret string) ports.TokenProvider {
	return &tokenProvider{secret: []byte(secret)}
}

func (tp *tokenProvider) GenerateAccessToken(userID int) (string, error) {
	c := claims{
		UserID: userID,
		RegisteredClaims: gojwt.RegisteredClaims{
			ExpiresAt: gojwt.NewNumericDate(time.Now().Add(accessTokenExpiry)),
			IssuedAt:  gojwt.NewNumericDate(time.Now()),
		},
	}

	token := gojwt.NewWithClaims(gojwt.SigningMethodHS256, c)
	return token.SignedString(tp.secret)
}

func (tp *tokenProvider) GenerateRefreshToken() (string, error) {
	return uuid.NewString(), nil
}

func (tp *tokenProvider) ValidateAccessToken(tokenStr string) (int, error) {
	token, err := gojwt.ParseWithClaims(tokenStr, &claims{}, func(t *gojwt.Token) (any, error) {
		if _, ok := t.Method.(*gojwt.SigningMethodHMAC); !ok {
			return nil, entities.ErrInvalidToken
		}
		return tp.secret, nil
	})
	if err != nil || !token.Valid {
		return 0, entities.ErrInvalidToken
	}

	c, ok := token.Claims.(*claims)
	if !ok {
		return 0, entities.ErrInvalidToken
	}

	return c.UserID, nil
}

func (tp *tokenProvider) HashToken(token string) string {
	hash := sha256.Sum256([]byte(token))
	return hex.EncodeToString(hash[:])
}

func (tp *tokenProvider) RefreshTokenExpiry() time.Time {
	return time.Now().Add(refreshTokenExpiry)
}
