package usecases

import (
	"context"

	"github.com/Aqandrade/smart-watchlist/internal/application/ports"
	"github.com/Aqandrade/smart-watchlist/internal/domain/entities"
)

type AddExampleUseCase struct {
	repo ports.ExampleRepository
}

func NewAddExampleUseCase(repo ports.ExampleRepository) *AddExampleUseCase {
	return &AddExampleUseCase{repo: repo}
}

func (uc *AddExampleUseCase) Execute(ctx context.Context, name string) (*entities.Example, error) {
	example := entities.NewExample(name)
	if err := uc.repo.Create(ctx, example); err != nil {
		return nil, err
	}
	return example, nil
}
