package application

import (
	"database/sql"

	"github.com/Aqandrade/smart-watchlist/internal/adapters/database/repositories"
	"github.com/Aqandrade/smart-watchlist/internal/adapters/http/handlers"
	"github.com/Aqandrade/smart-watchlist/internal/application/usecases"
)

type Container struct {
	ExampleHandler *handlers.ExampleHandler
}

func NewContainer(db *sql.DB) *Container {
	exampleRepo := repositories.NewPostgresExampleRepository(db)
	addExampleUseCase := usecases.NewAddExampleUseCase(exampleRepo)
	exampleHandler := handlers.NewExampleHandler(addExampleUseCase)

	return &Container{
		ExampleHandler: exampleHandler,
	}
}
