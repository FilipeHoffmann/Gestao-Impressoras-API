const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM faturamentoitens');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching faturamentoitens:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idFaturamentoItem, quantidade, valor, idFaturamento, idEmpenhoItem } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO faturamentoitens (idFaturamentoItem, quantidade, valor, idFaturamento, idEmpenhoItem) VALUES (?, ?, ?, ?, ?)',
            [idFaturamentoItem, quantidade, valor, idFaturamento, idEmpenhoItem]
        );

        res.status(201).json({ id: result.insertId, idFaturamentoItem, quantidade, valor, idFaturamento, idEmpenhoItem });
    } catch (error) {
        console.error('Error creating faturamentoitem:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idFaturamentoItem', async (req, res) => {
    const { idFaturamentoItem } = req.params;
    const { quantidade, valor, idFaturamento, idEmpenhoItem } = req.body;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'UPDATE faturamentoitens SET quantidade = ?, valor = ?, idFaturamento = ?, idEmpenhoItem = ? WHERE idFaturamentoItem = ?',
            [quantidade, valor, idFaturamento, idEmpenhoItem, idFaturamentoItem]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faturamento Item não encontrado' });
        }

        res.json({ idFaturamentoItem, quantidade, valor, idFaturamento, idEmpenhoItem });
    } catch (error) {
        console.error('Error updating faturamentoitem:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idFaturamentoItem', async (req, res) => {
    const { idFaturamentoItem } = req.params;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'DELETE FROM faturamentoitens WHERE idFaturamentoItem = ?',
            [idFaturamentoItem]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faturamento Item não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting faturamentoitem:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
