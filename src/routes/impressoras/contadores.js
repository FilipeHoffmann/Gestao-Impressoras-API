const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = Database;

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM contadores');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching contadores:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idContadores, contPB, contColor, data, idImpressora } = req.body;
        const [result] = await db.query(
            'INSERT INTO contadores (idContadores, contPB, contColor, data, idImpressora) VALUES (?, ?, ?, ?, ?)',
            [idContadores, contPB, contColor, data, idImpressora]
        );

        res.status(201).json({ id: result.insertId, idContadores, contPB, contColor, data, idImpressora });
    } catch (error) {
        console.error('Error creating contador:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idContadores', async (req, res) => {
    const { idContadores } = req.params;
    const { contPB, contColor, data, idImpressora } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE contadores SET contPB = ?, contColor = ?, data = ?, idImpressora = ? WHERE idContadores = ?',
            [contPB, contColor, data, idImpressora, idContadores]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contador não encontrado' });
        }

        res.json({ idContadores, contPB, contColor, data, idImpressora });
    } catch (error) {
        console.error('Error updating contador:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idContadores', async (req, res) => {
    const { idContadores } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM contadores WHERE idContadores = ?',
            [idContadores]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Contador não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting contador:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
