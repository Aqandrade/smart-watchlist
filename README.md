# Smart Watchlist

## Sobre o Projeto

Esse projeto é um MVP que visa facilitar na escolha de qual filme assistir.
Hoje, devido aos inúmeros streamings disponíveis com catálogos gigantes, fica cada vez mais difícil escolher qual filme assistir e em qual streaming ele está disponível no momento.
Para resolver esse problema, o Smart Watchlist permite que você adicione filmes à watchlist, exibindo em quais plataformas de streaming cada filme está disponível, evitando perder tempo navegando entre diferentes catálogos.

---

## Pré-requisitos

| Ferramenta                                                 | Versão mínima | Uso                                         |
| ---------------------------------------------------------- | ------------- | ------------------------------------------- |
| [Docker](https://docs.docker.com/get-docker/)              | 20+           | Containerização do backend e banco de dados |
| [Docker Compose](https://docs.docker.com/compose/install/) | 2.0+          | Orquestração dos serviços                   |
| [Make](https://www.gnu.org/software/make/)                 | 3.8+          | Comandos utilitários do backend             |
| [Node.js](https://nodejs.org/)                             | 18.10.0       | Runtime do frontend                         |
| [Yarn](https://yarnpkg.com/)                               | 1.22+         | Gerenciador de pacotes do frontend          |

### TMDB API Token

Este projeto utiliza a [API do TMDB (The Movie Database)](https://www.themoviedb.org/) como provedor de dados sobre filmes.

Para que o backend consiga buscar informações como título, sinopse, avaliação, duração e provedores de streaming, é necessário criar um **API Read Access Token**:

1. Crie uma conta em [themoviedb.org](https://www.themoviedb.org/signup)
2. Acesse [developer.themoviedb.org/docs/getting-started](https://developer.themoviedb.org/docs/getting-started)
3. Gere um **API Read Access Token** (Bearer Token)
4. Adicione o token no arquivo `.env` do backend como `TMDB_API_KEY`

---

## Como Subir o Projeto

### Backend

```bash
cd backend

# 1. Crie o arquivo .env com base no exemplo
cp .env.example .env
# Edite o .env e adicione o TMDB_API_KEY

# 2. Suba os containers (API + PostgreSQL)
make up

# 3. Rode as migrations
make migrate-up

# 4. Acompanhe os logs (hot reload com Air)
make logs
```

A API estará disponível em `http://localhost:8080`.

### Frontend

```bash
cd frontend

# 1. Crie o arquivo .env com base no exemplo
cp .env.example .env

# 2. Instale as dependências
yarn install

# 3. Inicie o servidor de desenvolvimento
yarn start
```

A aplicação estará disponível em `http://localhost:3000`.

---

## Variáveis de Ambiente

### Backend (`backend/.env`)

| Variável        | Padrão                         | Obrigatória | Descrição                       |
| --------------- | ------------------------------ | ----------- | ------------------------------- |
| `DATABASE_URL`  | —                              | Sim         | Connection string do PostgreSQL |
| `TMDB_API_KEY`  | —                              | Sim         | API Read Access Token do TMDB   |
| `TMDB_BASE_URL` | `https://api.themoviedb.org/3` | Não         | URL base da API do TMDB         |
| `SERVER_PORT`   | `8080`                         | Não         | Porta da API                    |

### Frontend (`frontend/.env`)

| Variável                            | Padrão | Obrigatória | Descrição             |
| ----------------------------------- | ------ | ----------- | --------------------- |
| `REACT_APP_SMART_WATCHLIST_API_URL` | —      | Sim         | URL da API do backend |

---

## Comandos Make (Backend)

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

---

## Arquitetura

### Backend — Arquitetura Hexagonal (Ports & Adapters)

O backend utiliza **arquitetura hexagonal** com o objetivo de isolar o domínio da aplicação dos detalhes de infraestrutura.

A principal vantagem dessa abordagem é a **facilidade de manutenção e substituição de adapters**. Atualmente, o TMDB é o provedor de dados sobre filmes, mas caso seja necessário substituí-lo por outro provedor (como OMDB, IMDB ou qualquer outro), basta criar um novo adapter que implemente a interface `MovieDataProvider` — a aplicação inteira continua funcionando sem nenhuma alteração nas camadas de domínio e aplicação.

O mesmo princípio se aplica ao banco de dados: os repositórios implementam interfaces definidas na camada de aplicação (ports), permitindo trocar o PostgreSQL por outro banco sem impactar as regras de negócio.

```
backend/
├── cmd/api/                         → Entry point (main.go + graceful shutdown)
├── config/
│   ├── application/                 → Injeção de dependências (DI container)
│   ├── database/                    → Conexão com PostgreSQL
│   └── envs/                        → Carregamento de variáveis de ambiente
├── internal/
│   ├── domain/
│   │   ├── entities/                → Entidades e erros do domínio
│   │   └── services/                → Serviços de domínio (regras puras)
│   ├── application/
│   │   ├── usecases/                → Casos de uso (orquestração)
│   │   └── ports/                   → Interfaces (contratos entre camadas)
│   └── adapters/
│       ├── http/
│       │   ├── handlers/            → HTTP handlers (Gin)
│       │   ├── routes/              → Registro de rotas
│       │   ├── requests/            → DTOs de request
│       │   └── responses/           → DTOs de response
│       ├── database/
│       │   ├── models/              → Modelos do banco de dados
│       │   └── repositories/        → Implementação dos repositórios
│       └── clients/                 → Clients HTTP externos (TMDB)
├── migrations/                      → SQL migrations (golang-migrate)
├── Dockerfile                       → Multi-stage build (dev + prod)
├── docker-compose.yml               → Orquestração (API + PostgreSQL)
└── Makefile                         → Comandos utilitários
```

**Direção de dependência:** `adapters → application → domain`. O domínio não conhece nenhum detalhe de infraestrutura.

### Frontend — Clean Architecture

O frontend utiliza **Clean Architecture** inspirada nos princípios de separação de responsabilidades. A estrutura é dividida em camadas com responsabilidades bem definidas, onde cada camada depende apenas da camada mais interna, nunca o contrário.

Essa arquitetura permite que mudanças na camada de infraestrutura (como trocar o Axios por Fetch ou outra lib HTTP) não impactem as regras de negócio, e que a camada de apresentação possa ser alterada sem afetar a lógica de dados.

```
frontend/src/
├── domain/                          → Regras de negócio puras
│   ├── dtos/                        → Data Transfer Objects
│   ├── models/                      → Interfaces dos modelos de dados
│   └── usecases/                    → Contratos dos casos de uso
├── data/                            → Implementação dos casos de uso
│   ├── protocols/http/              → Contrato do client HTTP
│   └── usecases/                    → Implementação dos usecases (chamadas HTTP)
├── infra/                           → Implementações concretas de infraestrutura
│   └── http/                        → Adapter Axios (implementa IHttpClient)
├── main/                            → Composição e injeção de dependências
│   ├── factories/
│   │   ├── http/                    → Factories do client HTTP e URL
│   │   ├── usecases/                → Factories dos casos de uso
│   │   └── pages/                   → Factories das páginas (composição final)
│   └── routes/                      → Configuração de rotas
└── presentation/                    → Interface do usuário
    ├── components/                  → Componentes reutilizáveis
    ├── pages/                       → Páginas da aplicação
    ├── themes/                      → Tema e design tokens
    ├── helpers/                     → Utilitários de apresentação
    └── common/types/                → Tipos compartilhados da apresentação
```

**Direção de dependência:** `presentation → main → data → domain`. A camada `main` é responsável por compor todas as dependências via factories, garantindo que cada componente receba apenas as abstrações que precisa, sem acoplamento direto com implementações concretas.

---

## Endpoints da API

### Watchlist

| Método | Endpoint                            | Descrição                               |
| ------ | ----------------------------------- | --------------------------------------- |
| `GET`  | `/v1/watchlist?page=1&page_size=20` | Lista filmes da watchlist com paginação |
| `POST` | `/v1/watchlist`                     | Adiciona um filme à watchlist           |
| `GET`  | `/v1/movies?movie_name=nome`        | Busca filmes no TMDB pelo nome          |

### Exemplos

**Buscar filmes:**

```bash
curl "http://localhost:8080/v1/movies?movie_name=Matrix"
```

**Adicionar filme à watchlist:**

```bash
curl -X POST http://localhost:8080/v1/watchlist \
  -H "Content-Type: application/json" \
  -d '{"movie_name": "Matrix"}'
```

**Listar watchlist:**

```bash
curl "http://localhost:8080/v1/watchlist?page=1&page_size=20"
```

---

## Stack Tecnológica

### Backend

- **Go 1.25** — Linguagem principal
- **Gin** — Framework HTTP
- **PostgreSQL 16** — Banco de dados relacional
- **golang-migrate** — Gerenciamento de migrations
- **Air** — Hot reload em desenvolvimento
- **Docker** — Containerização

### Frontend

- **React 18** — Biblioteca de UI
- **TypeScript** — Tipagem estática
- **Styled Components** — CSS-in-JS
- **Axios** — Client HTTP
- **React Router v6** — Roteamento
- **Recoil** — Gerenciamento de estado
- **Phosphor Icons** — Biblioteca de ícones
