const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM empenhoexcedentes');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching empenhoexcedentes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idEmpenhoExcedentes, quantidade, saldo, valor, idEmpenho, idExcedentes } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO empenhoexcedentes (idEmpenhoExcedentes, quantidade, saldo, valor, idEmpenho, idExcedentes) VALUES (?, ?, ?, ?, ?, ?)',
            [idEmpenhoExcedentes, quantidade, saldo, valor, idEmpenho, idExcedentes]
        );

        res.status(201).json({ id: result.insertId, idEmpenhoExcedentes, quantidade, saldo, valor, idEmpenho, idExcedentes });
    } catch (error) {
        console.error('Error creating empenhoexcedentes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idEmpenhoExcedentes', async (req, res) => {
    const { idEmpenhoExcedentes } = req.params;
    const { quantidade, saldo, valor, idEmpenho, idExcedentes } = req.body;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'UPDATE empenhoexcedentes SET quantidade = ?, saldo = ?, valor = ?, idEmpenho = ?, idExcedentes = ? WHERE idEmpenhoExcedentes = ?',
            [quantidade, saldo, valor, idEmpenho, idExcedentes, idEmpenhoExcedentes]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empenho Excedente não encontrado' });
        }

        res.json({ idEmpenhoExcedentes, quantidade, saldo, valor, idEmpenho, idExcedentes });
    } catch (error) {
        console.error('Error updating empenhoexcedentes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idEmpenhoExcedentes', async (req, res) => {
    const { idEmpenhoExcedentes } = req.params;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'DELETE FROM empenhoexcedentes WHERE idEmpenhoExcedentes = ?',
            [idEmpenhoExcedentes]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empenho Excedente não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting empenhoexcedentes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
