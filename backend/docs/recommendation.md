# Smart Recommendation — Algoritmo de Recomendação Inteligente

## Visão geral

O endpoint de recomendação inteligente sugere um único filme da watchlist do usuário com base em critérios objetivos: disponibilidade nas assinaturas ativas, tempo disponível (opcional) e qualidade (nota TMDB como desempate).

---

## Endpoint

```
GET /v1/watchlist/recommendation?max_duration=120
```

**Autenticação:** Bearer Token obrigatório.

**Query params:**

| Parâmetro    | Tipo    | Obrigatório | Descrição                                              |
|--------------|---------|-------------|--------------------------------------------------------|
| `max_duration` | inteiro | Não       | Duração máxima do filme em **minutos**. Se omitido, não há filtro de duração. |

---

## Algoritmo (ordem de aplicação)

### 1. Filmes não assistidos
Busca todos os filmes da watchlist do usuário com status `PENDING`.

- **Erro** se nenhum filme encontrado → `ErrNoMoviesInWatchlist`

### 2. Assinaturas ativas
Busca todas as assinaturas de streaming com `active = true` do usuário.

- **Erro** se nenhuma assinatura ativa → `ErrNoActiveSubscriptions`

### 3. Filtragem por assinaturas
Mantém apenas os filmes cujo campo `providers` contém ao menos um provider presente nas assinaturas ativas do usuário.

- **Erro** se nenhum filme restante → `ErrNoMoviesMatchingActiveSubscriptions`

### 4. Mínimo de filmes
Para que a recomendação seja considerada "inteligente" (com comparação entre opções), são necessários pelo menos **2 filmes** após o filtro de assinaturas.

- **Erro** se apenas 1 filme restante → `ErrNotEnoughMoviesForRecommendation`

### 5. Filtro de duração (opcional)
Se `max_duration` for informado, mantém apenas filmes com `duration ≤ max_duration` (em minutos).

- **Erro** se nenhum filme restante após o filtro → `ErrNoMoviesMatchingDuration`

### 6. Seleção do melhor filme
Entre os filmes restantes, retorna o com maior `external_source_rating` (nota TMDB).

**Desempate determinístico:** quando dois filmes têm a mesma nota, é retornado o com menor `entity_id` lexicograficamente.

---

## Resposta de sucesso

**HTTP 200 OK**

```json
{
  "entity_id": "550e8400-e29b-41d4-a716-446655440000",
  "movie_name": "Inception",
  "movie_description": "A thief who steals corporate secrets...",
  "movie_director": "Christopher Nolan",
  "movie_release_date": 2010,
  "movie_duration": 148,
  "external_source_rating": 8.8,
  "providers": ["Netflix", "Amazon Prime Video"],
  "status": "PENDING"
}
```

---

## Erros

**HTTP 422 Unprocessable Entity** para todos os casos abaixo:

| Código de erro (`error`)                       | Significado                                                       |
|------------------------------------------------|-------------------------------------------------------------------|
| `no movies in watchlist`                       | O usuário não tem filmes na watchlist                             |
| `no active subscriptions`                      | O usuário não tem assinaturas de streaming ativas                 |
| `no movies matching active subscriptions`      | Nenhum filme da watchlist está disponível nas assinaturas ativas  |
| `not enough movies for smart recommendation`   | Apenas 1 filme disponível após filtro de assinaturas (mínimo: 2) |
| `no movies matching duration criteria`         | Nenhum filme se encaixa no `max_duration` informado               |

**HTTP 400 Bad Request:**

| Situação                        | Descrição                                      |
|---------------------------------|------------------------------------------------|
| `max_duration` não é inteiro    | `"max_duration must be a valid integer (minutes)"` |

**HTTP 500 Internal Server Error:** erro inesperado no servidor.

---

## Exemplos

### Sem filtro de duração
```
GET /v1/watchlist/recommendation
Authorization: Bearer <token>
```

### Com filtro de duração (máximo 90 minutos)
```
GET /v1/watchlist/recommendation?max_duration=90
Authorization: Bearer <token>
```

---

## Regras de negócio resumidas

1. Somente filmes com status `PENDING` (não assistidos) são considerados.
2. Somente filmes disponíveis em pelo menos uma assinatura ativa do usuário são considerados.
3. O filtro de duração é opcional e em minutos.
4. A recomendação requer no mínimo 2 filmes elegíveis (após filtro de assinaturas) para ser considerada inteligente.
5. O desempate é feito pela maior nota TMDB (`external_source_rating`).
6. Gêneros não são considerados na versão atual.
