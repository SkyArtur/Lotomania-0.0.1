# Lotomania APP

Aplicação React (SPA) para acompanhar apostas da Lotomania (Caixa Econômica Federal): login/cadastro de usuário,
painel com o total apostado e premiado, o último concurso e a última aposta registrada, e um formulário para
cadastrar novos concursos e apostas — consumindo a [Lotomania API](../lotomania-API/README.md).

> Projeto de uso pessoal e didático — construído para aprender React na prática (componentes, hooks, roteamento,
> autenticação via JWT, formulários controlados/não controlados e containerização), sem fins comerciais.

## O que a aplicação faz

- **Login e cadastro** de usuário (bettor), autenticado via JWT contra a API.
- **Dashboard** — mostra o total apostado e o total recebido em prêmios do usuário logado, o último concurso
  sorteado (números e premiação) e a última aposta registrada (números, resultados e prêmios).
- **Cadastro de concurso ou aposta** via formulário modal: seleção dos números numa grade (limitada a 20 números
  para concurso, 50 para aposta), e, no caso de concurso, uma lista de premiações com validação das faixas de pontos
  aceitas pela Lotomania (0, 15, 16, 17, 18, 19, 20), permitindo adicionar/remover cada prêmio antes de enviar.
- **Mensagens de sucesso/erro** exibidas na barra de navegação após o envio, com atualização automática dos dados do
  painel.

## Tecnologias necessárias

- [Node.js](https://nodejs.org/) 24+ e npm, para desenvolvimento local
- [React](https://react.dev/) 19 + [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4
- [React Router](https://reactrouter.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- JavaScript puro (sem TypeScript, por enquanto)
- [Docker](https://www.docker.com/) + Nginx, para execução containerizada
- A [Lotomania API](../lotomania-API/README.md) rodando (local ou em container) — esta aplicação não funciona
  sozinha, ela é só o front-end

## Estrutura

```
src/
  api/          # funções que conversam com a API Django (fetch)
  components/   # componentes reutilizáveis (Header, Navbar, Bettor, Bet, Contest, Form...)
  pages/        # telas (Login, Cadastro, Dashboard)
  hooks/        # hooks customizados (useApi)
  context/      # Context API (autenticação/JWT)
  App.jsx
  main.jsx
```

## Instalação e execução

### Localmente (desenvolvimento)

```bash
cd lotomania-APP
npm install
cp .env.example .env
npm run dev
```

Por padrão, `VITE_API_URL=/api-lotomania` é um caminho relativo: o `vite.config.js` já tem um proxy que encaminha
`/api-lotomania` para `http://localhost:8000` (a API rodando localmente via `manage.py runserver`). Ajuste o alvo do
proxy em `vite.config.js` caso a API esteja em outro endereço.

### Com Docker

```bash
cd lotomania-APP
docker compose -f docker/docker-compose.yml up -d --build
```

Sobe um container Nginx servindo a aplicação já compilada, na porta `80` (`http://localhost/`). O Nginx também faz
proxy reverso de `/api-lotomania/` para o container da API (serviço `api`, porta `8080`) através da rede Docker
compartilhada `lotomania-net` — por isso a API precisa estar rodando (via o Compose dela) **antes** de subir este
container. Veja as instruções de containerização da API em
[lotomania-API/README.md](../lotomania-API/README.md#containerização).

## Licença

Distribuído sob a licença MIT — veja [LICENSE](LICENSE).
