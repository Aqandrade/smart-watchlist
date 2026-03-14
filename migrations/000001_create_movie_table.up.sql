CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    entity_id VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(250) NOT NULL,
    description TEXT,
    director VARCHAR(250),
    release_date SMALLINT,
    duration SMALLINT,
    external_source VARCHAR(100),
    external_source_id BIGINT UNIQUE,
    external_source_rating NUMERIC(3,1),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
