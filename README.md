# Lotomania

Projeto pessoal para organizar apostas da Lotomania (Caixa Econômica Federal): registrar apostas, sincronizar os
concursos oficiais e calcular automaticamente os acertos e premiações de cada aposta.

> Projeto de uso pessoal e didático, sem fins comerciais.

O projeto é dividido em duas partes:

## API

API REST construída com Django REST Framework. Cuida do cadastro de usuários (bettors), do registro e consulta de
apostas restritas ao próprio usuário autenticado, e da sincronização dos concursos da Lotomania a partir de um
arquivo CSV local — sem depender de nenhum serviço externo em tempo de execução. A cada concurso novo, calcula
automaticamente os acertos e premiações das apostas existentes.

Mais detalhes: [lotomania-API/README.md](lotomania-API/README.md).

## APP

Aplicação React (SPA) que consome a API: login/cadastro de usuário, painel com o total apostado e premiado, o
último concurso e a última aposta registrada, e um formulário para cadastrar novos concursos e apostas.

Mais detalhes: [lotomania-APP/README.md](lotomania-APP/README.md).

## Executando o projeto completo via Docker

O diretório `docker/`, na raiz do projeto, reúne API e APP num único Docker Compose — usa as mesmas imagens já
definidas em `lotomania-API/docker/` e `lotomania-APP/docker/`, sem duplicar nada, apenas orquestrando os dois
projetos juntos.

```bash
docker compose -f docker/docker-compose.yml up -d --build
docker compose -f docker/docker-compose.yml exec api python manage.py migrate
```

Isso sobe seis containers: `db` (PostgreSQL), `redis`, `api`, `worker` e `beat` (Celery) e `app` (Nginx servindo o
front-end). Portas expostas na sua máquina:

- **`8080`** — API, para acesso direto (Swagger em `/api-lotomania/docs/`, admin, etc.).
- **`80`** — aplicação React, inclusive de outros dispositivos na mesma rede (ex: pelo celular, em
  `http://<ip-da-sua-máquina>/`).

Diferente das versões separadas de cada projeto, aqui a API e o APP estão no mesmo Compose e por isso já enxergam um
ao outro pela rede interna do Docker — o Nginx do APP encaminha `/api-lotomania/` para o serviço `api` diretamente,
sem precisar de rede externa compartilhada.

As migrações não rodam automaticamente (rode o comando acima após o primeiro `up`), e o volume do banco é próprio
dessa stack unificada — não compartilha dados com os Composes individuais de cada projeto.
