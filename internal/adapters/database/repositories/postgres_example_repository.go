package repositories

import (
	"context"
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type PostgresExampleRepository struct {
	db *sql.DB
}

func NewPostgresExampleRepository(db *sql.DB) *PostgresExampleRepository {
	return &PostgresExampleRepository{db: db}
}

func (r *PostgresExampleRepository) Create(ctx context.Context, example *entities.Example) error {
	query := `INSERT INTO examples (id, name, created_at) VALUES ($1, $2, $3)`
	_, err := r.db.ExecContext(ctx, query, example.ID, example.Name, example.CreatedAt)
	return err
}
