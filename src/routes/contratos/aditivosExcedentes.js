const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = Database;

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM aditivosexcedentes');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching aditivosexcedentes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idAditivoExcedente, descricao, quantidade, valor, idAditivo, idExcedente } = req.body;
        const [result] = await db.query(
            'INSERT INTO aditivosexcedentes (idAditivoExcedente, descricao, quantidade, valor, idAditivo, idExcedente) VALUES (?, ?, ?, ?, ?, ?)',
            [idAditivoExcedente, descricao, quantidade, valor, idAditivo, idExcedente]
        );

        res.status(201).json({ id: result.insertId, idAditivoExcedente, descricao, quantidade, valor, idAditivo, idExcedente });
    } catch (error) {
        console.error('Error creating aditivoexcedente:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idAditivoExcedente', async (req, res) => {
    const { idAditivoExcedente } = req.params;
    const { descricao, quantidade, valor, idAditivo, idExcedente } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE aditivosexcedentes SET descricao = ?, quantidade = ?, valor = ?, idAditivo = ?, idExcedente = ? WHERE idAditivoExcedente = ?',
            [descricao, quantidade, valor, idAditivo, idExcedente, idAditivoExcedente]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aditivo Excedente não encontrado' });
        }

        res.json({ idAditivoExcedente, descricao, quantidade, valor, idAditivo, idExcedente });
    } catch (error) {
        console.error('Error updating aditivoexcedente:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idAditivoExcedente', async (req, res) => {
    const { idAditivoExcedente } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM aditivosexcedentes WHERE idAditivoExcedente = ?',
            [idAditivoExcedente]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aditivo Excedente não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting aditivoexcedente:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
