package repositories

import (
	"context"
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type movieWatchProviderRepository struct {
	db *sql.DB
}

func NewMovieWatchProviderRepository(db *sql.DB) ports.MovieWatchProviderRepository {
	return &movieWatchProviderRepository{db: db}
}

func (r *movieWatchProviderRepository) Create(ctx context.Context, providers []entities.MovieWatchProvider) error {
	query := `
		INSERT INTO movie_watch_providers (entity_id, movie_id, provider_id)
		VALUES ($1, $2, $3)`

	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	stmt, err := tx.PrepareContext(ctx, query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	for _, p := range providers {
		if _, err := stmt.ExecContext(ctx, p.EntityID, p.MovieID, p.ProviderID); err != nil {
			return err
		}
	}

	return tx.Commit()
}
