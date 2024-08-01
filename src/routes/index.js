const express = require('express');
const router = express.Router();

const msg = {
    title: '🖨️ Gestao Impressoras API',
    description: 'API para a conexão com o banco de dados.',
    routesContratos: [
        '/contratos',
        '/produtos',
        '/secretarias',
        '/aditivos',
        '/excedentes',
        '/itens',
        '/aditivosExcendentes',
        '/aditivosItens'
    ],
    routesImpressoras: [
        '/impressoras',
        '/contadores',
        '/instalacoes'
    ]
};

router.get('/', (req, res) => {
    res.json(msg);
});

const aditivosRouter = require('./contratos/aditivos');
const aditivosExcendentesRouter = require('./contratos/aditivosExcedentes');
const aditivosItensRouter = require('./contratos/aditivosItens');
const contratosRouter = require('./contratos/contratos');
const excedentesRouter = require('./contratos/excedentes');
const itensRouter = require('./contratos/itens');
const produtosRouter = require('./contratos/produtos');
const secretariasRouter = require('./contratos/secretarias');

const impressorasRouter = require('./impressoras/impressoras');
const instalacoesRouter = require('./impressoras/instalacoes');
const contadoresRouter = require('./impressoras/contadores');

router.use('/aditivos', aditivosRouter);
router.use('/aditivosExcendentes', aditivosExcendentesRouter);
router.use('/aditivosItens', aditivosItensRouter);
router.use('/contratos', contratosRouter);
router.use('/excedentes', excedentesRouter);
router.use('/itensRouter', itensRouter);
router.use('/produtos', produtosRouter);
router.use('/secretarias', secretariasRouter);

router.use('/contadores',contadoresRouter);
router.use('/instalacoes',instalacoesRouter);
router.use('/impressoras',impressorasRouter);


module.exports = router;
