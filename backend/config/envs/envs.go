package envs

import (
	"fmt"
	"os"
)

type Config struct {
	ServerPort  string
	DatabaseURL string
	TMDBBaseURL string
	TMDBAPIKey  string
	JWTSecret   string
}

func Load() (*Config, error) {
	cfg := &Config{
		ServerPort:  getEnv("SERVER_PORT", "8080"),
		DatabaseURL: os.Getenv("DATABASE_URL"),
		TMDBBaseURL: getEnv("TMDB_BASE_URL", "https://api.themoviedb.org/3"),
		TMDBAPIKey:  os.Getenv("TMDB_API_KEY"),
		JWTSecret:   os.Getenv("JWT_SECRET"),
	}

	if cfg.DatabaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}

	if cfg.TMDBAPIKey == "" {
		return nil, fmt.Errorf("TMDB_API_KEY is required")
	}

	if cfg.JWTSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET is required")
	}

	return cfg, nil
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
