const express = require('express');
const router = express.Router();

const msg = {
    title: '🖨️ Gestao Impressoras API',
    description: 'API para a conexão com o banco de dados.',
    routes: [
        '/contratos',
        '/produtos',
        '/secretarias',
        '/aditivos',
        '/excedentes',
        '/itens',
        '/aditivosExcendentes',
        '/aditivosItens'
    ]
};

router.get('/', (req, res) => {
    res.json(msg);
});

const aditivosRouter = require('./aditivos');
const aditivosExcendentesRouter = require('./aditivosExcedentes');
const aditivosItensRouter = require('./aditivosItens');
const contratosRouter = require('./contratos');
const excedentesRouter = require('./excedentes');
const itensRouter = require('./itens');
const produtosRouter = require('./produtos');
const secretariasRouter = require('./secretarias');

router.use('/aditivos', aditivosRouter);
router.use('/aditivosExcendentes', aditivosExcendentesRouter);
router.use('/aditivosItens', aditivosItensRouter);
router.use('/contratos', contratosRouter);
router.use('/excedentes', excedentesRouter);
router.use('/itensRouter', itensRouter);
router.use('/produtos', produtosRouter);
router.use('/secretarias', secretariasRouter);

module.exports = router;
