const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM itens');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching itens:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idItem, descricao, quantidade, saldo, valorAtual, idContrato, idProduto, idSecretaria } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO itens (idItem, descricao, quantidade, saldo, valorAtual, idContrato, idProduto, idSecretaria) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [idItem, descricao, quantidade, saldo, valorAtual, idContrato, idProduto, idSecretaria]
        );

        res.status(201).json({ id: result.insertId, idItem, descricao, quantidade, saldo, valorAtual, idContrato, idProduto, idSecretaria });
    } catch (error) {
        console.error('Error creating item:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idItem', async (req, res) => {
    const { idItem } = req.params;
    const { descricao, quantidade, saldo, valorAtual, idContrato, idProduto, idSecretaria } = req.body;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'UPDATE itens SET descricao = ?, quantidade = ?, saldo = ?, valorAtual = ?, idContrato = ?, idProduto = ?, idSecretaria = ? WHERE idItem = ?',
            [descricao, quantidade, saldo, valorAtual, idContrato, idProduto, idSecretaria, idItem]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        res.json({ idItem, descricao, quantidade, saldo, valorAtual, idContrato, idProduto, idSecretaria });
    } catch (error) {
        console.error('Error updating item:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idItem', async (req, res) => {
    const { idItem } = req.params;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'DELETE FROM itens WHERE idItem = ?',
            [idItem]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting item:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
