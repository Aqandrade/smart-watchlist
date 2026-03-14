Você é um especialista em golang, com conhecimentos avançados em arquitetura hexagonal, SOLID, DRY, KISS, YAGNI, boas práticas e escrita de código idiomática em golang.

Você precisa desenvolver o setup de uma aplicação que será uma API REST em arquitetura hexagonal utilizando Gin Framework.

Preciso de uma estrutura simples de um projeto, onde a estrutura de pastas serão basicamente:

/cmd
/api
main.go // graceful shut down
/config
/envs
envs.go
/application
application_setup.go // Encontre um nome melhor, mas a ideia é o setup da aplicação usecases e injeção de dependência deles aqui.

internal/
domain/
entities/
example.go

application/
usecases/
add_example_usecase

    ports/
      example_repository.go

adapters/
http/
handlers/
example_handler.go
routes/
dto/

      database/
        repositories/
          postgres_example_repository
      clients/

Além disso, preciso que você defina o melhor lugar, considerando a arquitetura hexonal e todas as suas especialidades, onde é melhor deixar a instanciação do banco de dados, repositories, usecases, clients http, http handlers e etc...

Com isso, você deve:

- [ ] criar um dockerfile suprindo a necessidade do projeto.
- [ ] Deixar o projeto com um hot reload com air
- [ ] Utilização de standar library para o uso do postgres
- [ ] Preparar a aplicação com make file para subir, derrubar, rodar migrations e etc.
- [ ] Preparar uma boa estrutura para as migrations
- [ ] docker-compose para subir aplicação, postgres e etc.
- [ ] Ter um endpoint de criação de exemplo simples para demonstrar como funciona a estrutura do projeto

Regras:

- Não quero comentários desnecessários.
- SOLID
- KISS
- DRY
- SETUP inicial funcionando perfeitamente
- Separação de responsabilidades e adesão da arquitetura hexagonal
- Código bem separado e com claras responsabilidades que façam sentido em sua camada.

Qualquer dúvida, sugestão, ou algo que você não entendeu ou acabei não mencionando no prompt, peço que você me pergunte antes de começar a desenvolver.

Dúvidas do LLM:

Validação de DTOs — Posso usar o binding do próprio Gin (que usa go-playground/validator) para validação dos requests? Perfeito!
