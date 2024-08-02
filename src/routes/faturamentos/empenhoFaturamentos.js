const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM empenhofaturamentos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching empenhofaturamentos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idEmpenhoFaturamentos, idEmpenho, idFaturamento } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO empenhofaturamentos (idEmpenhoFaturamentos, idEmpenho, idFaturamento) VALUES (?, ?, ?)',
            [idEmpenhoFaturamentos, idEmpenho, idFaturamento]
        );

        res.status(201).json({ id: result.insertId, idEmpenhoFaturamentos, idEmpenho, idFaturamento });
    } catch (error) {
        console.error('Error creating empenhofaturamentos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idEmpenhoFaturamentos', async (req, res) => {
    const { idEmpenhoFaturamentos } = req.params;
    const { idEmpenho, idFaturamento } = req.body;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'UPDATE empenhofaturamentos SET idEmpenho = ?, idFaturamento = ? WHERE idEmpenhoFaturamentos = ?',
            [idEmpenho, idFaturamento, idEmpenhoFaturamentos]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empenho Faturamento não encontrado' });
        }

        res.json({ idEmpenhoFaturamentos, idEmpenho, idFaturamento });
    } catch (error) {
        console.error('Error updating empenhofaturamentos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idEmpenhoFaturamentos', async (req, res) => {
    const { idEmpenhoFaturamentos } = req.params;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'DELETE FROM empenhofaturamentos WHERE idEmpenhoFaturamentos = ?',
            [idEmpenhoFaturamentos]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Empenho Faturamento não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting empenhofaturamentos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
