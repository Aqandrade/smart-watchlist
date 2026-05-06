package repositories

import (
	"context"
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type subscriptionRepository struct {
	db *sql.DB
}

func NewSubscriptionRepository(db *sql.DB) ports.SubscriptionRepository {
	return &subscriptionRepository{db: db}
}

func (r *subscriptionRepository) Create(ctx context.Context, s *entities.Subscription) (*entities.Subscription, error) {
	query := `
		INSERT INTO subscriptions (entity_id, user_id, provider_id, active)
		VALUES ($1, $2, $3, $4)
		RETURNING id, created_at, updated_at`

	err := r.db.QueryRowContext(ctx, query,
		s.EntityID, s.UserID, s.ProviderID, s.Active,
	).Scan(&s.ID, &s.CreatedAt, &s.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return s, nil
}

func (r *subscriptionRepository) FindByUserIDAndProviderID(ctx context.Context, userID, providerID int) (*entities.Subscription, error) {
	query := `
		SELECT id, entity_id, user_id, provider_id, active, created_at, updated_at
		FROM subscriptions
		WHERE user_id = $1 AND provider_id = $2`

	var s entities.Subscription
	err := r.db.QueryRowContext(ctx, query, userID, providerID).Scan(
		&s.ID, &s.EntityID, &s.UserID, &s.ProviderID, &s.Active, &s.CreatedAt, &s.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, entities.ErrSubscriptionNotFound
	}
	if err != nil {
		return nil, err
	}

	return &s, nil
}

func (r *subscriptionRepository) List(ctx context.Context, userID int, active *bool) ([]entities.SubscriptionListItem, error) {
	query := `
		SELECT s.entity_id, s.provider_id, p.name, s.active, s.created_at, s.updated_at
		FROM subscriptions s
		INNER JOIN providers p ON p.id = s.provider_id
		WHERE s.user_id = $1`

	args := []any{userID}
	if active != nil {
		query += ` AND s.active = $2`
		args = append(args, *active)
	}
	query += ` ORDER BY s.created_at DESC`

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	items := make([]entities.SubscriptionListItem, 0)
	for rows.Next() {
		var item entities.SubscriptionListItem
		if err := rows.Scan(
			&item.EntityID, &item.ProviderID, &item.ProviderName,
			&item.Active, &item.CreatedAt, &item.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (r *subscriptionRepository) UpdateStatus(ctx context.Context, entityID string, userID int, active bool) (*entities.Subscription, error) {
	query := `
		UPDATE subscriptions
		SET active = $1, updated_at = NOW()
		WHERE entity_id = $2 AND user_id = $3
		RETURNING id, entity_id, user_id, provider_id, active, created_at, updated_at`

	var s entities.Subscription
	err := r.db.QueryRowContext(ctx, query, active, entityID, userID).Scan(
		&s.ID, &s.EntityID, &s.UserID, &s.ProviderID, &s.Active, &s.CreatedAt, &s.UpdatedAt,
	)
	if err == sql.ErrNoRows {
		return nil, entities.ErrSubscriptionNotFound
	}
	if err != nil {
		return nil, err
	}

	return &s, nil
}
