const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = Database;

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM faturamentos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching faturamentos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idFaturamento, competencia, dataInicial, dataFinal, situacao } = req.body;
        const [result] = await db.query(
            'INSERT INTO faturamentos (idFaturamento, competencia, dataInicial, dataFinal, situacao) VALUES (?, ?, ?, ?, ?)',
            [idFaturamento, competencia, dataInicial, dataFinal, situacao]
        );

        res.status(201).json({ id: result.insertId, idFaturamento, competencia, dataInicial, dataFinal, situacao });
    } catch (error) {
        console.error('Error creating faturamento:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idFaturamento', async (req, res) => {
    const { idFaturamento } = req.params;
    const { competencia, dataInicial, dataFinal, situacao } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE faturamentos SET competencia = ?, dataInicial = ?, dataFinal = ?, situacao = ? WHERE idFaturamento = ?',
            [competencia, dataInicial, dataFinal, situacao, idFaturamento]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faturamento não encontrado' });
        }

        res.json({ idFaturamento, competencia, dataInicial, dataFinal, situacao });
    } catch (error) {
        console.error('Error updating faturamento:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idFaturamento', async (req, res) => {
    const { idFaturamento } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM faturamentos WHERE idFaturamento = ?',
            [idFaturamento]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faturamento não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting faturamento:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
