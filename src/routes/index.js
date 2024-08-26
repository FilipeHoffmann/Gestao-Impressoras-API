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
    ],
    routesFaturamentos: [
        '/empenhos',
        '/empenhoExcedentes',
        '/empenhoFaturamentos',
        '/empenhoItens',
        '/faturamentos',
        '/faturamentoExcedentes',
        '/faturamentoItens'
    ],
    developedBy: {
        name: 'Filipe Antonio Hoffmann Nishiguchi',
        linkedin: 'https://www.linkedin.com/in/filipe-antonio-hoffmann-nishiguchi/',
        github: 'https://github.com/FilipeHoffmann'
    }
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

const empenhosRouter = require('./faturamentos/empenhos');
const empenhoExcedentesRouter = require('./faturamentos/empenhoExcedentes');
const empenhoFaturamentosRouter = require('./faturamentos/empenhoFaturamentos');
const empenhoItensRouter = require('./faturamentos/empenhoItens');
const faturamentosRouter = require('./faturamentos/faturamentos');
const faturamentoExcedentesRouter = require('./faturamentos/faturamentoExcedentes');
const faturamentoItensRouter = require('./faturamentos/faturamentoItens');

router.use('/aditivos', aditivosRouter);
router.use('/aditivosExcendentes', aditivosExcendentesRouter);
router.use('/aditivosItens', aditivosItensRouter);
router.use('/contratos', contratosRouter);
router.use('/excedentes', excedentesRouter);
router.use('/itens', itensRouter);
router.use('/produtos', produtosRouter);
router.use('/secretarias', secretariasRouter);

router.use('/contadores',contadoresRouter);
router.use('/instalacoes',instalacoesRouter);
router.use('/impressoras',impressorasRouter);

router.use('/empenhos', empenhosRouter);
router.use('/empenhoExcedentes', empenhoExcedentesRouter);
router.use('/empenhoFaturamentos', empenhoFaturamentosRouter);
router.use('/empenhoItens', empenhoItensRouter);
router.use('/faturamentos', faturamentosRouter);
router.use('/faturamentoExcedentes', faturamentoExcedentesRouter);
router.use('/faturamentoItens', faturamentoItensRouter);

module.exports = router;
