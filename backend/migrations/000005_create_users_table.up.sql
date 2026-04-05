CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    entity_id     VARCHAR(36)  UNIQUE NOT NULL,
    name          VARCHAR(100) NOT NULL,
    username      VARCHAR(50)  UNIQUE NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);
