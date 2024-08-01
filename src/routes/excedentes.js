const express = require('express');
const router = express.Router();
const Database = require('../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM excedentes');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching excedentes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idExcedente, quantidade, saldo, valorAtual, idProduto } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO excedentes (idExcedente, quantidade, saldo, valorAtual, idProduto) VALUES (?, ?, ?, ?, ?)',
            [idExcedente, quantidade, saldo, valorAtual, idProduto]
        );

        res.status(201).json({ id: result.insertId, idExcedente, quantidade, saldo, valorAtual, idProduto });
    } catch (error) {
        console.error('Error creating excedente:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idExcedente', async (req, res) => {
    const { idExcedente } = req.params;
    const { quantidade, saldo, valorAtual, idProduto } = req.body;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'UPDATE excedentes SET quantidade = ?, saldo = ?, valorAtual = ?, idProduto = ? WHERE idExcedente = ?',
            [quantidade, saldo, valorAtual, idProduto, idExcedente]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Excedente não encontrado' });
        }

        res.json({ idExcedente, quantidade, saldo, valorAtual, idProduto });
    } catch (error) {
        console.error('Error updating excedente:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idExcedente', async (req, res) => {
    const { idExcedente } = req.params;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'DELETE FROM excedentes WHERE idExcedente = ?',
            [idExcedente]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Excedente não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting excedente:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
