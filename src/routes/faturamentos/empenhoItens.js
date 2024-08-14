const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = Database;

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM empenhoitens');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching empenhoitens:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idEmpenhoItem, quantidade, saldo, valor, idEmpenho, idItem, idEmpenhoExcedente } = req.body;
        const [result] = await db.query(
            'INSERT INTO empenhoitens (idEmpenhoItem, quantidade, saldo, valor, idEmpenho, idItem, idEmpenhoExcedente) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [idEmpenhoItem, quantidade, saldo, valor, idEmpenho, idItem, idEmpenhoExcedente]
        );

        res.status(201).json({ id: result.insertId, idEmpenhoItem, quantidade, saldo, valor, idEmpenho, idItem, idEmpenhoExcedente });
    } catch (error) {
        console.error('Error creating empenhoitens:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idEmpenhoItem', async (req, res) => {
    const { idEmpenhoItem } = req.params;
    const { quantidade, saldo, valor, idEmpenho, idItem, idEmpenhoExcedente } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE empenhoitens SET quantidade = ?, saldo = ?, valor = ?, idEmpenho = ?, idItem = ?, idEmpenhoExcedente = ? WHERE idEmpenhoItem = ?',
            [quantidade, saldo, valor, idEmpenho, idItem, idEmpenhoExcedente, idEmpenhoItem]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empenho Item não encontrado' });
        }

        res.json({ idEmpenhoItem, quantidade, saldo, valor, idEmpenho, idItem, idEmpenhoExcedente });
    } catch (error) {
        console.error('Error updating empenhoitens:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idEmpenhoItem', async (req, res) => {
    const { idEmpenhoItem } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM empenhoitens WHERE idEmpenhoItem = ?',
            [idEmpenhoItem]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empenho Item não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting empenhoitens:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
