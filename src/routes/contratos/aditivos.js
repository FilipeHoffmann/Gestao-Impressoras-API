const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = Database;

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM aditivos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching aditivos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idAditivo, descricao, dataInicial, dataFinal, situacao, idContrato } = req.body;
        const [result] = await db.query(
            'INSERT INTO aditivos (idAditivo, descricao, dataInicial, dataFinal, situacao, idContrato) VALUES (?, ?, ?, ?, ?, ?)',
            [idAditivo, descricao, dataInicial, dataFinal, situacao, idContrato]
        );

        res.status(201).json({ id: result.insertId, idAditivo, descricao, dataInicial, dataFinal, situacao, idContrato });
    } catch (error) {
        console.error('Error creating aditivo:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idAditivo', async (req, res) => {
    const { idAditivo } = req.params;
    const { descricao, dataInicial, dataFinal, situacao, idContrato } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE aditivos SET descricao = ?, dataInicial = ?, dataFinal = ?, situacao = ?, idContrato = ? WHERE idAditivo = ?',
            [descricao, dataInicial, dataFinal, situacao, idContrato, idAditivo]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aditivo não encontrado' });
        }

        res.json({ idAditivo, descricao, dataInicial, dataFinal, situacao, idContrato });
    } catch (error) {
        console.error('Error updating aditivo:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idAditivo', async (req, res) => {
    const { idAditivo } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM aditivos WHERE idAditivo = ?',
            [idAditivo]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aditivo não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting aditivo:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
