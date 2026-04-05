package repositories

import (
	"context"
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) ports.UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) Create(ctx context.Context, user *entities.User) (*entities.User, error) {
	query := `
		INSERT INTO users (entity_id, name, username, email, password_hash)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, created_at, updated_at`

	err := r.db.QueryRowContext(ctx, query,
		user.EntityID, user.Name, user.Username, user.Email, user.PasswordHash,
	).Scan(&user.ID, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (r *userRepository) FindByUsername(ctx context.Context, username string) (*entities.User, error) {
	query := `
		SELECT id, entity_id, name, username, email, password_hash, created_at, updated_at
		FROM users
		WHERE username = $1`

	var user entities.User
	err := r.db.QueryRowContext(ctx, query, username).Scan(
		&user.ID, &user.EntityID, &user.Name, &user.Username,
		&user.Email, &user.PasswordHash, &user.CreatedAt, &user.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, entities.ErrUserNotFound
	}
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *userRepository) FindByEmail(ctx context.Context, email string) (*entities.User, error) {
	query := `
		SELECT id, entity_id, name, username, email, password_hash, created_at, updated_at
		FROM users
		WHERE email = $1`

	var user entities.User
	err := r.db.QueryRowContext(ctx, query, email).Scan(
		&user.ID, &user.EntityID, &user.Name, &user.Username,
		&user.Email, &user.PasswordHash, &user.CreatedAt, &user.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, entities.ErrUserNotFound
	}
	if err != nil {
		return nil, err
	}

	return &user, nil
}
