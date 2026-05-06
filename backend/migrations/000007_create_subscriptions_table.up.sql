CREATE TABLE subscriptions (
    id          SERIAL PRIMARY KEY,
    entity_id   VARCHAR(36)  NOT NULL UNIQUE,
    user_id     INT          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider_id INT          NOT NULL REFERENCES providers(id),
    active      BOOLEAN      NOT NULL DEFAULT true,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, provider_id)
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
