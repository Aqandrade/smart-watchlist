CREATE TABLE refresh_tokens (
    id         SERIAL PRIMARY KEY,
    entity_id  VARCHAR(36)  UNIQUE NOT NULL,
    user_id    INT          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64)  UNIQUE NOT NULL,
    expires_at TIMESTAMP    NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
