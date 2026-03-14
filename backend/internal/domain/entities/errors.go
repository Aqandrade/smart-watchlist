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
)
