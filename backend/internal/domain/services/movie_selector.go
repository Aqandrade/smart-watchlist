package services

import (
	"strings"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type MovieSelector struct{}

func NewMovieSelector() *MovieSelector {
	return &MovieSelector{}
}

func (s *MovieSelector) SelectByExactName(results []entities.MovieSearchResult, name string) (*entities.MovieSearchResult, error) {
	normalized := strings.ToLower(strings.TrimSpace(name))
	for i, r := range results {
		if strings.ToLower(strings.TrimSpace(r.Title)) == normalized {
			return &results[i], nil
		}
	}
	return nil, entities.ErrMovieNotFoundOnProvider
}
