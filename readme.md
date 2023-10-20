# API GraphQL com MongoDB - Documentação
### API GraphQL que permite verificar saldo, depositar valores, sacar valores e lida com erros de saldo insuficiente. A API utiliza um banco de dados MongoDB para armazenar informações de conta e saldo.

## Requisitos
- Node.js
- MongoDB (docker-compose gera o container)

## Instalação
+ terminal: git clone https://github.com/JhonyMesquita/accountFin
+ terminal: cd accountFin
+ disponível um .env-example (renomeie para .env) 
## Rodando com docker
+ terminal: docker-compose up
+ API deve estar disponível no http://localhost:4000/

##Utilização
- Ao inicializar a API um registro será inserido automaticamente:
  {
    "conta": 123,
    "saldo": 1000,
  }
- Realize as querys pela interface disponibilizada pelo servidor
### saldo:
```
request:
  Operations:
    query Query($data: AccountInput!) {
      saldo(data: $data)
    }
  Variables:
  {
    "data": {
      "conta": 123
    }
  }
```
```
response:
    {
      "data": {
        "saldo": 1000
      }
    }
```
### depositar
```
request:
  Operations:
    mutation Depositar($data: ContaInput!) {
      depositar(data: $data) {
        conta
        saldo
      }
    }
  Variables:
    {
    "data": {
      "conta": 123,
      "valor": 200
    }
  }
```
```
response:
  {
    "data": {
      "depositar": {
        "conta": 123,
        "saldo": 1200
      }
    }
  }
```
### sacar - valor abaixo do saldo
```
request:
  Operation:
    mutation Sacar($data: ContaInput!) {
      sacar(data: $data) {
        conta
        saldo
      }
    }
  Variables:
    {
      "data": {
        "conta": 123,
        "valor": 100
      }
    }
```
```
response:
  {
    "data": {
      "sacar": {
        "conta": 123,
        "saldo": 1100
      }
    }
  }
```
### sacar - valor acima do saldo
```
request:
Operation:
    mutation Sacar($data: ContaInput!) {
      sacar(data: $data) {
        conta
        saldo
      }
    }
  Variables:
    {
      "data": {
        "conta": 123,
        "valor": 1200
      }
    }
```
```
response:
  "errors": [
    {
      "message": "Saldo insuficiente",
      "locations": [
          {
            "line": 6,
            "column": 3
          }
       ]
    }   
   ]
```
### createConta 
```
request:
  Operation:
    mutation CreateConta($data: ContaInput!) {
      createConta(data: $data) {
        conta
        saldo
      }
    }
  Variables:
    {
      "data": {
        "conta": 1234,
        "valor": 2000
      }
    }
```
```
response:
  {
    "data": {
      "createConta": {
        "conta": 1234,
        "saldo": 2000
      }
    }
  }
```
## Testes unitários
+ npm run test
