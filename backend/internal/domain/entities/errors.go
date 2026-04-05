package entities

import "errors"

var (
	ErrMovieNotFound           = errors.New("movie not found")
	ErrMovieNotFoundOnProvider = errors.New("movie not found on external provider")
	ErrProviderUnavailable     = errors.New("external provider is unavailable")
	ErrMovieAlreadyInWatchlist = errors.New("movie already exists in watchlist")
	ErrWatchlistNotFound       = errors.New("watchlist entry not found")
	ErrWatchProviderNotFound   = errors.New("watch providers not found on external provider")
	ErrProviderNotFound        = errors.New("provider not found")

	ErrUserNotFound       = errors.New("user not found")
	ErrUserAlreadyExists  = errors.New("user already exists")
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrInvalidToken       = errors.New("invalid or expired token")
	ErrWeakPassword       = errors.New("password must be at least 8 characters and contain uppercase, lowercase, number and special character")
	ErrPasswordMismatch   = errors.New("passwords do not match")
)
