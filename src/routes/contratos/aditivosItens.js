const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = Database;

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM aditivositens');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching aditivositens:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idAditivoItem, descricao, quantidade, valor, idItem, idAditivo } = req.body;
        const [result] = await db.query(
            'INSERT INTO aditivositens (idAditivoItem, descricao, quantidade, valor, idItem, idAditivo) VALUES (?, ?, ?, ?, ?, ?)',
            [idAditivoItem, descricao, quantidade, valor, idItem, idAditivo]
        );

        res.status(201).json({ id: result.insertId, idAditivoItem, descricao, quantidade, valor, idItem, idAditivo });
    } catch (error) {
        console.error('Error creating aditivoitem:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idAditivoItem', async (req, res) => {
    const { idAditivoItem } = req.params;
    const { descricao, quantidade, valor, idItem, idAditivo } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE aditivositens SET descricao = ?, quantidade = ?, valor = ?, idItem = ?, idAditivo = ? WHERE idAditivoItem = ?',
            [descricao, quantidade, valor, idItem, idAditivo, idAditivoItem]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aditivo Item não encontrado' });
        }

        res.json({ idAditivoItem, descricao, quantidade, valor, idItem, idAditivo });
    } catch (error) {
        console.error('Error updating aditivoitem:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idAditivoItem', async (req, res) => {
    const { idAditivoItem } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM aditivositens WHERE idAditivoItem = ?',
            [idAditivoItem]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aditivo Item não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting aditivoitem:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
