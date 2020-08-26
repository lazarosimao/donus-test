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
- JOI

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
`yarn install` e `yarn global add ts-node typescript`


- Rode o comando para executar as migrations
`yarn migrate:run`

- Rode o comando para executar os tests
`yarn test`

- Inicie o servidor
`yarn start`

# DOCUMENTAÇÃO
- [POST] - Create Account - `localhost:3333/api/v1/account/create`
```
BODY
```
```
{
	"fullName": "Lázaro Simão",
	"registerCpf": "32123457689"
}
```
```
WHERE                   TYPE                    DESCRIPTION
fullName                STRING                  Full name the a customer.
registerCpf             STRING                  Document identify

```
```
STATUS CODE             MESSAGE
201                     Success
400                     Error validating request body
409                     Already an account with cpf
500                     FATAL ERROR                     
```

- [POST] - Transaction Deposit - `localhost:3333/api/v1/transactions/deposit`
```
BODY
```
```
{
	"accountId": 2,
	"amountRequest": 2000.00
}
```
```
WHERE                   TYPE                    DESCRIPTION
accountId               NUMBER                  Code identify the an account
amountRequest           NUMBER                  Amount request to deposit

```
```
STATUS CODE             MESSAGE
201                     Success
400                     Error validating request body
500                     FATAL ERROR                     
```

- [POST] - Transaction Withdraw - `localhost:3333/api/v1/transactions/withdraw`
```
BODY
```
```
{
	"accountId": 2,
	"amountRequest": 2000.00
}
```
```
WHERE                   TYPE                    DESCRIPTION
accountId               NUMBER                  Code identify the an account
amountRequest           NUMBER                  Amount request to withdraw

```
```
STATUS CODE             MESSAGE
201                     Success
400                     Error validating request body
409                     Account does not have enough balance to effect this transaction
500                     FATAL ERROR                     
```

- [POST] - Transaction Transfer - `localhost:3333/api/v1/transactions/transfer`
```
BODY
```
```
{
	"accountId": 2,
      "toAccountId": 1,
	"amountRequest": 200.00
}
```
```
WHERE                   TYPE                    DESCRIPTION
accountId               NUMBER                  Code identify the an account
toAccountId             NUMBER                  Code identify the an account
amountRequest           NUMBER                  Amount request to withdraw

```
```
STATUS CODE             MESSAGE
201                     Success
400                     Error validating request body
409                     Account does not have enough balance to effect this transaction
500                     FATAL ERROR                     
```

- [GET] - Account Historic - `localhost:3333/api/v1/account/1`
```
PARAMS
```
```
WHERE                   TYPE                    DESCRIPTION
1                       NUMBER                  Code identify the an account
```
```
STATUS CODE             MESSAGE
200                     [Return Data]
500                     FATAL ERROR                     
```