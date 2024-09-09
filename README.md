# Documentação da API Gestão de Impressoras

## Descrição

API para gestão de impressoras, controle de contratos e aditivos, foi desenvolvida para atender a demanda de gerenciamento dos equipamentos e seus respectivos consumos.

## Requisitos

* Estar conectado ao banco de dados mySQL seguindo o modelo presente na pasta ```model``` que está no diretório. Recomenda-se usar a ferramenta MySQL Workbanch para gerar o banco de dados. Após estar com o banco de dados criado altere o arquivo ```.env``` para conter as informações de conexão com o banco recém criado. 

* Instalar as dependências do Node.js, sendo elas:
    * express
    * mysql2
    * dotenv

## Como Usar

Para utilizar a API Gestão de Impressoras, você pode enviar solicitações HTTP para os endpoints descritos no arquivo ```.\src\routes\index.js```. Os parâmetros necessários variam de acordo com o endpoint específico, mas todos eles aceitam requisições como: GET; POST; PUT; DELETE.

## Estrutura do Diretório do Projeto
```
.
├── model
│   ├── modelDB.mwb
│   └── modelDB.mwb.bak
├── node_modules
├── src
│   ├── routes
│   │   ├── contratos
│   │   │   ├── aditivos.js
│   │   │   ├── aditivosExcedentes.js
│   │   │   ├── aditivosItens.js
│   │   │   ├── contratos.js
│   │   │   ├── excedentes.js
│   │   │   ├── itens.js
│   │   │   ├── produtos.js
│   │   │   └── secretarias.js
│   │   ├── faturamentos
│   │   │   ├── empenhoExcedentes.js
│   │   │   ├── empenhoFaturamentos.js
│   │   │   ├── empenhoItens.js
│   │   │   ├── empenhos.js
│   │   │   ├── faturamentoExcedentes.js
│   │   │   ├── faturamentoItens.js
│   │   │   └── faturamentos.js
│   │   ├── impressoras
│   │   │   ├── contadores.js
│   │   │   ├── impressoras.js
│   │   │   └── instalacoes.js
│   │   └── index.js
│   ├── app.js
│   └── database.js
├── .env
├── package-lock.json
├── package.json
└── README.md
```

## Corpo de Requisições
### Aditivos
```
{
    "idAditivo": 1,
    "descricao": "Teste",
    "dataInicial": "15-08-25",
    "dataFinal": "15-08-26",
    "situacao": "ATIVO",
    "idContrato": 2025
}
```
### Excedentes Aditivos
```
{
    "idAditivoExcedente": 1,
    "descricao": "Teste",
    "quantidade": 1,
    "valor": 1.0,
    "idAditivo": 1,
    "idExcedente": 1
}
```

### Itens Aditivos
```
{
    "idAditivoExcedente": 1,
    "descricao": "Teste",
    "quantidade": 1,
    "valor": 1.0,
    "idAditivo": 1,
    "idExcedente": 1
}
```

### Contratos
```
{
    "idContrato": 1
    "dataInicial": "15-08-24"
    "dataFinal": "15-08-25"
    "dataFinalAtual": "15-08-26"
}
```