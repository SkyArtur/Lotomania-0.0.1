# Lotomania

Projeto pessoal para organizar apostas da Lotomania (Caixa Econômica Federal): registrar apostas, sincronizar os
concursos oficiais e calcular automaticamente os acertos e premiações de cada aposta.

> Projeto de uso pessoal, sem fins comerciais.

O projeto é dividido em duas partes:

- **API** — back-end responsável por todo o domínio (apostas, concursos, usuários) e pela sincronização dos dados
  oficiais dos concursos.
- **APP** — front-end em React que vai consumir a API para cadastro de usuários, registro de apostas e visualização
  dos resultados. Ainda não implementado; será tratado em uma etapa posterior.

Esta primeira versão do README cobre apenas a API, já em desenvolvimento.

## API

API REST construída com Django REST Framework. Cuida do cadastro de usuários (bettors), do registro e consulta de
apostas restritas ao próprio usuário autenticado, e da sincronização dos concursos da Lotomania a partir de um
arquivo CSV local — sem depender de nenhum serviço externo em tempo de execução. A cada concurso novo, calcula
automaticamente os acertos e premiações das apostas existentes.

Descrição completa, instruções de containerização e de atualização dos dados: [lotomania-API/README.md](lotomania-API/README.md).
