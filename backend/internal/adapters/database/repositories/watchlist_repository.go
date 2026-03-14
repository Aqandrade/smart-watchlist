package repositories

import (
	"context"
	"database/sql"

	"github.com/lib/pq"

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

func (r *watchlistRepository) ListWatchlist(ctx context.Context, userID, page, pageSize int) ([]entities.WatchlistItem, int, error) {
	countQuery := `SELECT COUNT(*) FROM watchlist WHERE user_id = $1`

	var total int
	if err := r.db.QueryRowContext(ctx, countQuery, userID).Scan(&total); err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []entities.WatchlistItem{}, 0, nil
	}

	query := `
		SELECT w.entity_id, m.id, m.name, m.description, m.director, m.release_date,
		       m.duration, m.external_source_rating, w.status, w.created_at
		FROM watchlist w
		INNER JOIN movie m ON m.id = w.movie_id
		WHERE w.user_id = $1
		ORDER BY w.created_at DESC
		LIMIT $2 OFFSET $3`

	offset := (page - 1) * pageSize
	rows, err := r.db.QueryContext(ctx, query, userID, pageSize, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	type itemWithMovieID struct {
		item    entities.WatchlistItem
		movieID int
	}

	var results []itemWithMovieID
	var movieIDs []int
	for rows.Next() {
		var r itemWithMovieID
		if err := rows.Scan(
			&r.item.EntityID, &r.movieID, &r.item.MovieName, &r.item.MovieDescription,
			&r.item.MovieDirector, &r.item.MovieReleaseDate, &r.item.MovieDuration,
			&r.item.ExternalSourceRating, &r.item.Status, &r.item.CreatedAt,
		); err != nil {
			return nil, 0, err
		}
		results = append(results, r)
		movieIDs = append(movieIDs, r.movieID)
	}

	if err := rows.Err(); err != nil {
		return nil, 0, err
	}

	providersMap, err := r.findProvidersByMovieIDs(ctx, movieIDs)
	if err != nil {
		return nil, 0, err
	}

	items := make([]entities.WatchlistItem, 0, len(results))
	for _, r := range results {
		r.item.Providers = providersMap[r.movieID]
		items = append(items, r.item)
	}

	return items, total, nil
}

func (r *watchlistRepository) findProvidersByMovieIDs(ctx context.Context, movieIDs []int) (map[int][]string, error) {
	result := make(map[int][]string)
	if len(movieIDs) == 0 {
		return result, nil
	}

	query := `
		SELECT mwp.movie_id, p.name
		FROM movie_watch_providers mwp
		INNER JOIN providers p ON p.id = mwp.provider_id
		WHERE mwp.movie_id = ANY($1)`

	rows, err := r.db.QueryContext(ctx, query, pq.Array(movieIDs))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var movieID int
		var providerName string
		if err := rows.Scan(&movieID, &providerName); err != nil {
			return nil, err
		}
		result[movieID] = append(result[movieID], providerName)
	}

	return result, rows.Err()
}
