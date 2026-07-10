# Lotomania API

API REST em Django REST Framework para registro de apostas da Lotomania e acompanhamento dos concursos oficiais.
Projeto pessoal — back-end da futura aplicação React (ainda não iniciada).

## Stack

- Django 6 + Django REST Framework
- PostgreSQL (produção) / SQLite (desenvolvimento)
- Autenticação via JWT (`djangorestframework-simplejwt`)
- Celery + Redis, para sincronização agendada dos concursos
- drf-spectacular, para documentação OpenAPI/Swagger
- Docker Compose, para execução containerizada

## Funcionamento

O domínio da API gira em torno de quatro entidades principais:

- **BettorUser** — usuário da aplicação (apostador). Autentica-se via JWT.
- **Bet** — uma aposta: 50 números escolhidos, intervalo de concursos válidos (`initial`/`final`) e indicação de
  aposta espelhada (`mirror`). Toda aposta pertence a um único `BettorUser` e só é visível para ele.
- **Contest** — um concurso oficial da Lotomania: referência, data, os 20 números sorteados e a tabela de prêmios
  por faixa de pontos.
- **Number** — os números válidos de 0 a 99, usados tanto em apostas quanto em concursos.

Quando um concurso novo é sincronizado, a API verifica automaticamente todas as apostas cujo intervalo
(`initial`/`final`) cobre a referência daquele concurso e recalcula, para cada uma delas, os acertos (`BetResult`)
e as premiações correspondentes (`BetPrize`), vinculando a aposta ao concurso (`BetContest`). Isso vale tanto para
concursos importados via CSV quanto para concursos cadastrados manualmente pela API.

### Autenticação e principais endpoints

Toda a API exige autenticação (JWT) por padrão, exceto login e cadastro. Prefixo comum: `/api-lotomania/`.

| Método | Endpoint                     | Descrição                                            |
|--------|-------------------------------|-------------------------------------------------------|
| POST   | `token/`                      | Login — retorna `access`/`refresh` JWT                |
| POST   | `token/refresh/`               | Renova o `access` token                                |
| POST   | `bettors/`                    | Cadastro de um novo usuário                            |
| GET    | `bettors/me/`                 | Dados do usuário autenticado                           |
| GET    | `bets/`                       | Lista as apostas do usuário autenticado                |
| POST   | `bets/`                       | Cria uma nova aposta para o usuário autenticado         |
| GET    | `bets/{id}/`                  | Detalha uma aposta (somente do próprio usuário)         |
| GET    | `bets/latest/`                | Última aposta do usuário autenticado                    |
| GET    | `contests/`                   | Lista os concursos cadastrados                          |
| POST   | `contests/`                   | Cadastra um concurso manualmente                        |
| GET    | `contests/latest/`            | Último concurso cadastrado                              |
| GET    | `numbers/`                    | Lista os números válidos (0–99)                         |
| GET    | `docs/`                       | Swagger UI                                              |
| GET    | `schema/`                     | Especificação OpenAPI                                   |

## Execução local (sem Docker)

```bash
cd lotomania-API
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env               # ajuste os valores conforme necessário

python manage.py migrate
python manage.py runserver
```

Por padrão (`DJANGO_ENV=development`), o banco usado é SQLite e não é necessário subir Postgres/Redis para a API
web responder. Para exercitar Celery localmente, é preciso um Redis acessível e as variáveis `CELERY_BROKER_URL`/
`CELERY_RESULT_BACKEND` apontando para ele.

## Containerização

Os arquivos de Docker ficam em `lotomania-API/docker/`. O Compose deve ser executado a partir da raiz da API
(`lotomania-API`), apontando para o arquivo dentro de `docker/`:

```bash
cd lotomania-API
docker compose -f docker/docker-compose.yml up -d --build
```

Isso sobe cinco serviços: `db` (PostgreSQL), `redis`, `api` (Gunicorn, porta `8080`), `worker` e `beat` (Celery).
A API fica disponível em `http://localhost:8080/api-lotomania/`.

As migrações não rodam automaticamente — aplique manualmente após o primeiro `up`:

```bash
docker compose -f docker/docker-compose.yml exec api python manage.py migrate
```

Outros comandos úteis:

```bash
docker compose -f docker/docker-compose.yml logs -f api      # logs da API
docker compose -f docker/docker-compose.yml exec api python manage.py createsuperuser
docker compose -f docker/docker-compose.yml down             # para os containers
docker compose -f docker/docker-compose.yml down -v          # para e remove os volumes (apaga o banco)
```

A API se conecta a uma rede externa fixa (`lotomania-net`), criada por este mesmo Compose, para que uma futura
stack do APP (React) possa alcançá-la pelo nome do serviço (`api`) sem depender da porta publicada no host.

## Atualização dos concursos (`lotomania.csv`)

A API nunca busca resultados em nenhum serviço externo — nem ao vivo, nem em segundo plano. Os dados sempre chegam
por um destes dois caminhos:

1. **Cadastro manual de um concurso**, via `POST /api-lotomania/contests/` (endpoint usado futuramente pelo APP).
2. **Sincronização a partir do arquivo `core/data/lotomania.csv`**, descrita abaixo.

O fluxo do arquivo é inteiramente manual e fora do repositório: baixe a planilha oficial da Lotomania (`.xlsx`) no
site da Caixa, corrija/converta para `.csv` com sua própria ferramenta de linha de comando e substitua o arquivo em
`lotomania-API/core/data/lotomania.csv`. Em produção (Docker), esse diretório é montado como volume somente leitura
nos serviços `api` e `worker`, então basta sobrescrever o arquivo no host — sem precisar reconstruir a imagem.

A partir daí, a sincronização com o banco acontece de duas formas, que podem ser usadas juntas sem conflito
(a operação é idempotente — concursos já importados nunca são duplicados):

- **Automática** — o `beat` do Celery dispara a sincronização toda terça, quinta e sábado, às 21h
  (`America/Sao_Paulo`).
- **Sob demanda**, logo após substituir o arquivo, para não esperar o próximo ciclo agendado:

```bash
# via Docker
docker compose -f docker/docker-compose.yml exec api python manage.py update_contests

# execução local (sem Docker)
python manage.py update_contests
```

O comando reporta os concursos importados e, se algum registro do CSV falhar, os demais continuam sendo
processados normalmente — a falha é reportada ao final sem interromper o lote.

## Testes

```bash
python manage.py test core.tests api.tests
```

## Licença

Distribuído sob a licença MIT — veja [LICENSE](LICENSE).
