const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = Database;

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM secretarias');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching secretarias:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idSecretaria, secretaria } = req.body;
        const [result] = await db.query(
            'INSERT INTO secretarias (idSecretaria, secretaria) VALUES (?, ?)',
            [idSecretaria, secretaria]
        );

        res.status(201).json({ id: result.insertId, idSecretaria, secretaria });
    } catch (error) {
        console.error('Error creating secretaria:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idSecretaria', async (req, res) => {
    const { idSecretaria } = req.params;
    const { secretaria } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE secretarias SET secretaria = ? WHERE idSecretaria = ?',
            [secretaria, idSecretaria]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Secretaria não encontrada' });
        }

        res.json({ idSecretaria, secretaria });
    } catch (error) {
        console.error('Error updating secretaria:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idSecretaria', async (req, res) => {
    const { idSecretaria } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM secretarias WHERE idSecretaria = ?',
            [idSecretaria]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Secretaria não encontrada' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting secretaria:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
