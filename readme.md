#API GraphQL com MongoDB - Documentação
###API GraphQL que permite verificar saldo, depositar valores, sacar valores e lida com erros de saldo insuficiente. A API utiliza um banco de dados MongoDB para armazenar informações de conta e saldo.

##Requisitos
-Node.js
-MongoDB

##Instalação
+ terminal: git clone https://github.com/JhonyMesquita/accountFin
+ terminal: cd repositório
+ terminal: npm install
+ configure o MongoDB - no arquivo connection.ts - mongoose.connect("url_do_seu_MongoDB")
+ terminal: npm run
+ API deve estar disponível no http://localhost:4000/

##Utilização
- Ao inicializar a API um registro será inserido automaticamente:
  {
    "conta": 123,
    "saldo": 1000,
  }
  
###saldo:
request:
    query {
      saldo(conta: 123)
    }
response:
    {
      "data": {
        "saldo": 1000
      }
    }
###depositarValor
request:
  mutation {
        depositar(conta: 123, valor: 200) {
          conta
          saldo
        }
response:
  {
    "data": {
      "depositar": {
        "conta": 123,
        "saldo": 1200
      }
    }
  }
###sacar - valor abaixo do saldo
request:
  mutation {
    sacar(conta: 123, valor: 600) {
      conta
      saldo
    }
  }
response:
  {
    "data": {
      "sacar": {
        "conta": 123,
        "saldo": 600
      }
    }
  }
###sacar - valor acima do saldo
request:
  mutation {
    sacar(conta: 123, valor: 600) {
      conta
      saldo
    }
  }
response:
  {
    "errors": [
      {
        "message": "Saldo insuficiente",
        "locations": [
          {
            "line": 6,
            "column": 3
          }
      }
  }

##Testes unitários
+ npm run test
