const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = Database;

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching produtos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { idProduto, descricao, franquiaPB, franquiaColor, tipo, copiaLocacao, color } = req.body;
        const [result] = await db.query(
            'INSERT INTO produtos (idProduto, descricao, franquiaPB, franquiaColor, tipo, copiaLocacao, color) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [idProduto, descricao, franquiaPB, franquiaColor, tipo, copiaLocacao, color]
        );

        res.status(201).json({ id: result.insertId, idProduto, descricao, franquiaPB, franquiaColor, tipo, copiaLocacao, color });
    } catch (error) {
        console.error('Error creating produto:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idProduto', async (req, res) => {
    const { idProduto } = req.params;
    const { descricao, franquiaPB, franquiaColor, tipo, copiaLocacao, color } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE produtos SET descricao = ?, franquiaPB = ?, franquiaColor = ?, tipo = ?, copiaLocacao = ?, color = ? WHERE idProduto = ?',
            [descricao, franquiaPB, franquiaColor, tipo, copiaLocacao, color, idProduto]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.json({ idProduto, descricao, franquiaPB, franquiaColor, tipo, copiaLocacao, color });
    } catch (error) {
        console.error('Error updating produto:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idProduto', async (req, res) => {
    const { idProduto } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM produtos WHERE idProduto = ?',
            [idProduto]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting produto:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
