const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM empenhos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching empenhos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idEmpenho, empenho, descricao, idSecretaria } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO empenhos (idEmpenho, empenho, descricao, idSecretaria) VALUES (?, ?, ?, ?)',
            [idEmpenho, empenho, descricao, idSecretaria]
        );

        res.status(201).json({ id: result.insertId, idEmpenho, empenho, descricao, idSecretaria });
    } catch (error) {
        console.error('Error creating empenho:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idEmpenho', async (req, res) => {
    const { idEmpenho } = req.params;
    const { empenho, descricao, idSecretaria } = req.body;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'UPDATE empenhos SET empenho = ?, descricao = ?, idSecretaria = ? WHERE idEmpenho = ?',
            [empenho, descricao, idSecretaria, idEmpenho]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empenho não encontrado' });
        }

        res.json({ idEmpenho, empenho, descricao, idSecretaria });
    } catch (error) {
        console.error('Error updating empenho:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idEmpenho', async (req, res) => {
    const { idEmpenho } = req.params;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'DELETE FROM empenhos WHERE idEmpenho = ?',
            [idEmpenho]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empenho não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting empenho:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
