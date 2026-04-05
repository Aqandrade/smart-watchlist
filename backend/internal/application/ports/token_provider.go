package ports

import "time"

type TokenProvider interface {
	GenerateAccessToken(userID int) (string, error)
	GenerateRefreshToken() (string, error)
	ValidateAccessToken(token string) (int, error)
	HashToken(token string) string
	RefreshTokenExpiry() time.Time
}
