# Smart Watchlist

API REST em Go com arquitetura hexagonal, Gin Framework e PostgreSQL.

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/)

## Primeiros passos

```bash
# 1. Clone o repositório
git clone https://github.com/Aqandrade/smart-watchlist.git
cd smart-watchlist

# 2. Suba os containers (API + PostgreSQL)
make up

# 3. Rode as migrations
make migrate-up

# 4. Acompanhe os logs (hot reload com Air)
make logs
```

A API estará disponível em `http://localhost:8080`.

## Endpoints

### Criar exemplo

```bash
curl -X POST http://localhost:8080/api/v1/examples \
  -H "Content-Type: application/json" \
  -d '{"name": "meu exemplo"}'
```

**Response (201):**

```json
{
  "id": "uuid",
  "name": "meu exemplo",
  "created_at": "2026-03-11T00:00:00Z"
}
```

## Comandos disponíveis

| Comando                         | Descrição                    |
| ------------------------------- | ---------------------------- |
| `make up`                       | Sobe API + PostgreSQL        |
| `make down`                     | Derruba os containers        |
| `make down-v`                   | Derruba containers e volumes |
| `make build`                    | Rebuilda os containers       |
| `make logs`                     | Logs da API em tempo real    |
| `make migrate-up`               | Executa todas as migrations  |
| `make migrate-down`             | Reverte a última migration   |
| `make migrate-drop`             | Remove todas as tabelas      |
| `make migrate-create name=nome` | Cria nova migration          |

## Estrutura do projeto

```
├── cmd/api/                         → Entry point (main.go + graceful shutdown)
├── config/
│   ├── application/                 → Injeção de dependências
│   ├── database/                    → Conexão com PostgreSQL
│   └── envs/                        → Variáveis de ambiente
├── internal/
│   ├── domain/entities/             → Entidades do domínio
│   ├── application/
│   │   ├── usecases/                → Casos de uso
│   │   └── ports/                   → Interfaces (contratos)
│   └── adapters/
│       ├── http/handlers/           → HTTP handlers
│       ├── http/routes/             → Rotas
│       ├── http/dto/                → Request/Response DTOs
│       ├── database/repositories/   → Implementação dos repositórios
│       └── clients/                 → Clients HTTP externos
├── migrations/                      → SQL migrations
├── Dockerfile                       → Multi-stage (dev + prod)
├── docker-compose.yml               → Orquestração dos serviços
└── Makefile                         → Comandos utilitários
```

## Variáveis de ambiente

| Variável       | Padrão | Descrição                       |
| -------------- | ------ | ------------------------------- |
| `SERVER_PORT`  | `8080` | Porta da API                    |
| `DATABASE_URL` | —      | Connection string do PostgreSQL |

Veja o [.env.example](.env.example) para referência.
