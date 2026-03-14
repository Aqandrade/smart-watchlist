CREATE TABLE providers (
    id SERIAL PRIMARY KEY,
    entity_id VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(25) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO providers (entity_id, name) VALUES
    (gen_random_uuid(), 'Netflix'),
    (gen_random_uuid(), 'Amazon Prime Video'),
    (gen_random_uuid(), 'Disney Plus'),
    (gen_random_uuid(), 'HBO Max'),
    (gen_random_uuid(), 'Paramount Plus'),
    (gen_random_uuid(), 'Apple TV Plus'),
    (gen_random_uuid(), 'Globoplay'),
    (gen_random_uuid(), 'Star Plus'),
    (gen_random_uuid(), 'Crunchyroll'),
    (gen_random_uuid(), 'Mubi');
