# Lotomania APP

Aplicação React (Vite) que vai consumir a [Lotomania API](../lotomania-API/README.md): cadastro/login de usuário,
registro de apostas e acompanhamento dos concursos. Projeto pessoal, em desenvolvimento.

## Stack

- React 19 + Vite
- Tailwind CSS
- JavaScript (sem TypeScript, por enquanto)

## Estrutura

```
src/
  api/          # funções que conversam com a API Django (fetch)
  components/   # componentes reutilizáveis
  pages/        # telas (Login, Cadastro, Apostas...)
  hooks/        # hooks customizados
  context/      # Context API (ex: autenticação/JWT)
  App.jsx
  main.jsx
```

As pastas acima vão surgindo conforme cada funcionalidade é implementada.

## Executando localmente

```bash
cd lotomania-APP
npm install
npm run dev
```
