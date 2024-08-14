const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = Database;

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT `contratos`.`idContrato`, DATE_FORMAT(`contratos`.`dataInicial`, '%d-%m-%y') AS `dataInicial`, DATE_FORMAT(`contratos`.`dataFinal`, '%d-%m-%y') AS `dataFinal`, DATE_FORMAT(`contratos`.`dataFinalAtual`, '%d-%m-%y') AS `dataFinalAtual` FROM `gestaoimpressoras`.`contratos`;");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching contratos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idContrato, dataInicial, dataFinal, dataFinalAtual } = req.body;
        const [result] = await db.query(
            'INSERT INTO contratos (idContrato, dataInicial, dataFinal, dataFinalAtual) VALUES (?, ?, ?, ?)',
            [idContrato, dataInicial, dataFinal, dataFinalAtual]
        );

        res.status(201).json({ id: result.insertId, idContrato, dataInicial, dataFinal, dataFinalAtual });
    } catch (error) {
        console.error('Error creating contrato:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idContrato', async (req, res) => {
    const { idContrato } = req.params;
    const { dataInicial, dataFinal, dataFinalAtual } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE contratos SET dataInicial = ?, dataFinal = ?, dataFinalAtual = ? WHERE idContrato = ?',
            [dataInicial, dataFinal, dataFinalAtual, idContrato]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contrato não encontrado' });
        }

        res.json({ idContrato, dataInicial, dataFinal, dataFinalAtual });
    } catch (error) {
        console.error('Error updating contrato:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idContrato', async (req, res) => {
    const { idContrato } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM contratos WHERE idContrato = ?',
            [idContrato]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contrato não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting contrato:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
