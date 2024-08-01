const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM produtos');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching produtos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idProduto, descricao, franquiaPB, franquiaColor, tipo, copiaLocacao, color } = req.body;
        const [result] = await connection.execute(
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
        const connection = await db.getConnection();
        const [result] = await connection.execute(
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
        const connection = await db.getConnection();
        const [result] = await connection.execute(
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
