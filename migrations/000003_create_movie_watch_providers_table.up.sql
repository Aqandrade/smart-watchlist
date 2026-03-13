CREATE TABLE movie_watch_providers (
    id SERIAL PRIMARY KEY,
    entity_id VARCHAR(36) NOT NULL UNIQUE,
    movie_id INT NOT NULL REFERENCES movie(id),
    provider_id INT NOT NULL REFERENCES providers(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_movie_watch_providers_movie_id ON movie_watch_providers(movie_id);
