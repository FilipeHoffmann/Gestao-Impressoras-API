const express = require('express');
const router = express.Router();
const Database = require('../../database');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM impressoras');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching impressoras:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idImpressora, marcaModelo } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO impressoras (idImpressora, marcaModelo) VALUES (?, ?)',
            [idImpressora, marcaModelo]
        );

        res.status(201).json({ id: result.insertId, idImpressora, marcaModelo });
    } catch (error) {
        console.error('Error creating impressora:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idImpressora', async (req, res) => {
    const { idImpressora } = req.params;
    const { marcaModelo } = req.body;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'UPDATE impressoras SET marcaModelo = ? WHERE idImpressora = ?',
            [marcaModelo, idImpressora]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Impressora não encontrada' });
        }

        res.json({ idImpressora, marcaModelo });
    } catch (error) {
        console.error('Error updating impressora:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idImpressora', async (req, res) => {
    const { idImpressora } = req.params;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'DELETE FROM impressoras WHERE idImpressora = ?',
            [idImpressora]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Impressora não encontrada' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting impressora:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
