const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM faturamentos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching faturamentos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idFaturamento, competencia, dataInicial, dataFinal, situacao } = req.body;
        const [result] = await connection.execute(
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
        const connection = await db.getConnection();
        const [result] = await connection.execute(
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
        const connection = await db.getConnection();
        const [result] = await connection.execute(
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
