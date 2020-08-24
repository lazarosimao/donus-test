# CODE CHALLENGE - DONUS

## SOBRE O SISTEMA
Criar uma API com algumas funções essenciais relacionadas ao gerenciamento de contas bancárias.

## TECNOLOGIAS E FERRAMENTAS UTILIZADAS
- NodeJS
- Typescript
- NPM
- Jest
- Typeorm
- Sqlite3

# TODO LIST 
- [ x ] Devo criar a tabela Account
- [ x ] Devo criar a tabela Transaction
- [ x ] Devo criar a estrutura de pastas seguindo a metodologia SOLID 

# TODO SISTEMA
## O usuário do sistema...
- [ x ] Pode criar uma conta com o "nome completo e cpf"
- [ x ] Não pode ter mais do que uma conta com o cpf
- [ x ] Pode realizar transferencia para outra conta (Não tem taxa | Ilimitado)
- [ x ] Pode realizar deposito
      - [ x ] (Recebe 0,5% do valor depositado)
- [ x ] Pode realizar retirada
      - [ x ] (É cobrado 1% do sobre o valor retirado) - corrigir
- [ x ] Visualiza o histórico de movimentações da conta

# ESTRUTURA DE PASTAS (ALGUMAS)
- `__tests__` = Todos os testes do sistema.
- `src/useCases/` = Nesta pasta estão todas as funcionalidades. Dentro dela tem um controller, um arquivo onde ficam as regras de negócio e um contrato com os dados que a funcionalidade precisa.
- `src/repositores/interfaces` = Os contratos de cada repositorio.
- `src/repositores/implementations` = As implementações de cada repositorio.
- `src/entities` = Os models

# EXECUÇÃO
- Instale as dependências
`yarn install`

- Rode o comando para executar as migrations
`yarn migrate:run`

- Rode o comando para executar os tests
`yarn test`

- Inicie o servidor
`yarn start:dev`
