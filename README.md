# Documentação da API Gestão de Impressoras

## Descrição

API para gestão de impressoras, controle de contratos e aditivos, foi desenvolvida para atender a demanda de gerenciamento dos equipamentos e seus respectivos consumos.

## Como Usar

Para utilizar a API Gestao, você pode enviar solicitações HTTP para os endpoints fornecidos, conforme descrito abaixo. Os parâmetros necessários variam de acordo com o endpoint específico, conforme documentado.

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

