package repositories

import (
	"context"
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type movieRepository struct {
	db *sql.DB
}

func NewMovieRepository(db *sql.DB) ports.MovieRepository {
	return &movieRepository{db: db}
}

func (r *movieRepository) FindByName(ctx context.Context, name string) (*entities.Movie, error) {
	query := `
		SELECT id, entity_id, name, description, director, release_date, duration,
		       external_source, external_source_id, external_source_rating,
		       created_at, updated_at
		FROM movie
		WHERE name = $1`

	var movie entities.Movie
	err := r.db.QueryRowContext(ctx, query, name).Scan(
		&movie.ID, &movie.EntityID, &movie.Name, &movie.Description,
		&movie.Director, &movie.ReleaseDate, &movie.Duration,
		&movie.ExternalSource, &movie.ExternalSourceID, &movie.ExternalSourceRating,
		&movie.CreatedAt, &movie.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, entities.ErrMovieNotFound
	}
	if err != nil {
		return nil, err
	}

	return &movie, nil
}

func (r *movieRepository) Create(ctx context.Context, movie *entities.Movie) (*entities.Movie, error) {
	query := `
		INSERT INTO movie (entity_id, name, description, director, release_date, duration,
		                    external_source, external_source_id, external_source_rating)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id, created_at, updated_at`

	err := r.db.QueryRowContext(ctx, query,
		movie.EntityID, movie.Name, movie.Description, movie.Director,
		movie.ReleaseDate, movie.Duration, movie.ExternalSource,
		movie.ExternalSourceID, movie.ExternalSourceRating,
	).Scan(&movie.ID, &movie.CreatedAt, &movie.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return movie, nil
}
