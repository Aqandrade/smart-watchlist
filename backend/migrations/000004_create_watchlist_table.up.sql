CREATE TABLE watchlist (
    id SERIAL PRIMARY KEY,
    entity_id VARCHAR(36) NOT NULL UNIQUE,
    movie_id INT NOT NULL REFERENCES movie(id),
    user_id INT NOT NULL,
    status VARCHAR(25) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_watchlist_movie_id ON watchlist(movie_id);
CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);
