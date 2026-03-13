package repositories

import (
	"context"
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type watchlistRepository struct {
	db *sql.DB
}

func NewWatchlistRepository(db *sql.DB) ports.WatchlistRepository {
	return &watchlistRepository{db: db}
}

func (r *watchlistRepository) Create(ctx context.Context, watchlist *entities.Watchlist) (*entities.Watchlist, error) {
	query := `
		INSERT INTO watchlist (entity_id, movie_id, user_id, status)
		VALUES ($1, $2, $3, $4)
		RETURNING id, created_at, updated_at`

	err := r.db.QueryRowContext(ctx, query,
		watchlist.EntityID, watchlist.MovieID, watchlist.UserID, watchlist.Status,
	).Scan(&watchlist.ID, &watchlist.CreatedAt, &watchlist.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return watchlist, nil
}

func (r *watchlistRepository) FindByMovieIDAndUserID(ctx context.Context, movieID, userID int) (*entities.Watchlist, error) {
	query := `
		SELECT id, entity_id, movie_id, user_id, status, created_at, updated_at
		FROM watchlist
		WHERE movie_id = $1 AND user_id = $2`

	var watchlist entities.Watchlist
	err := r.db.QueryRowContext(ctx, query, movieID, userID).Scan(
		&watchlist.ID, &watchlist.EntityID, &watchlist.MovieID,
		&watchlist.UserID, &watchlist.Status,
		&watchlist.CreatedAt, &watchlist.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, entities.ErrWatchlistNotFound
	}
	if err != nil {
		return nil, err
	}

	return &watchlist, nil
}
