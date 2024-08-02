const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM faturamentoexcedentes');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching faturamentoexcedentes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idFaturamentoExcedente, quantidade, valor, idFaturamento, idEmpenhoExcedente } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO faturamentoexcedentes (idFaturamentoExcedente, quantidade, valor, idFaturamento, idEmpenhoExcedente) VALUES (?, ?, ?, ?, ?)',
            [idFaturamentoExcedente, quantidade, valor, idFaturamento, idEmpenhoExcedente]
        );

        res.status(201).json({ id: result.insertId, idFaturamentoExcedente, quantidade, valor, idFaturamento, idEmpenhoExcedente });
    } catch (error) {
        console.error('Error creating faturamentoexcedente:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idFaturamentoExcedente', async (req, res) => {
    const { idFaturamentoExcedente } = req.params;
    const { quantidade, valor, idFaturamento, idEmpenhoExcedente } = req.body;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'UPDATE faturamentoexcedentes SET quantidade = ?, valor = ?, idFaturamento = ?, idEmpenhoExcedente = ? WHERE idFaturamentoExcedente = ?',
            [quantidade, valor, idFaturamento, idEmpenhoExcedente, idFaturamentoExcedente]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faturamento Excedente não encontrado' });
        }

        res.json({ idFaturamentoExcedente, quantidade, valor, idFaturamento, idEmpenhoExcedente });
    } catch (error) {
        console.error('Error updating faturamentoexcedente:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idFaturamentoExcedente', async (req, res) => {
    const { idFaturamentoExcedente } = req.params;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'DELETE FROM faturamentoexcedentes WHERE idFaturamentoExcedente = ?',
            [idFaturamentoExcedente]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faturamento Excedente não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting faturamentoexcedente:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
