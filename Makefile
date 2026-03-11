.PHONY: up down down-v build logs migrate-up migrate-down migrate-drop migrate-create

up:
	docker compose up --build -d

down:
	docker compose down

down-v:
	docker compose down -v

build:
	docker compose build

logs:
	docker compose logs -f api

migrate-up:
	docker compose exec api sh -c 'migrate -path=./migrations -database "$$DATABASE_URL" up'

migrate-down:
	docker compose exec api sh -c 'migrate -path=./migrations -database "$$DATABASE_URL" down 1'

migrate-drop:
	docker compose exec api sh -c 'migrate -path=./migrations -database "$$DATABASE_URL" drop -f'

migrate-create:
	docker compose exec api migrate create -ext sql -dir ./migrations -seq $(name)
