const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute("SELECT `contratos`.`idContrato`, DATE_FORMAT(`contratos`.`dataInicial`, '%Y-%m-%d') AS `dataInicial`, DATE_FORMAT(`contratos`.`dataFinal`, '%Y-%m-%d') AS `dataFinal`, DATE_FORMAT(`contratos`.`dataFinalAtual`, '%Y-%m-%d') AS `dataFinalAtual` FROM `gestaoimpressoras`.`contratos`;");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching contratos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idContrato, dataInicial, dataFinal, dataFinalAtual } = req.body;
        const [result] = await connection.execute(
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
        const connection = await db.getConnection();
        const [result] = await connection.execute(
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
        const connection = await db.getConnection();
        const [result] = await connection.execute(
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
