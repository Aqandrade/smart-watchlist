package repositories

import (
	"context"
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type providerRepository struct {
	db *sql.DB
}

func NewProviderRepository(db *sql.DB) ports.ProviderRepository {
	return &providerRepository{db: db}
}

func (r *providerRepository) FindByName(ctx context.Context, name string) (*entities.Provider, error) {
	query := `SELECT id, entity_id, name, created_at, updated_at FROM providers WHERE name = $1`

	var provider entities.Provider
	err := r.db.QueryRowContext(ctx, query, name).Scan(
		&provider.ID, &provider.EntityID, &provider.Name,
		&provider.CreatedAt, &provider.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, entities.ErrProviderNotFound
	}
	if err != nil {
		return nil, err
	}

	return &provider, nil
}
