const express = require('express');
const router = express.Router();
const Database = require('../../database.js');
const db = new Database();

router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.execute('SELECT * FROM instalacoes');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching instalacoes:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const { idInstalacao, localInstalacao, endereco, transformador, responsavel, ip, dataInstalacao, contInstalacao, dataRetirada, contRetirada, idItem, idImpressora } = req.body;
        const [result] = await connection.execute(
            'INSERT INTO instalacoes (idInstalacao, localInstalacao, endereco, transformador, responsavel, ip, dataInstalacao, contInstalacao, dataRetirada, contRetirada, idItem, idImpressora) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [idInstalacao, localInstalacao, endereco, transformador, responsavel, ip, dataInstalacao, contInstalacao, dataRetirada, contRetirada, idItem, idImpressora]
        );

        res.status(201).json({ id: result.insertId, idInstalacao, localInstalacao, endereco, transformador, responsavel, ip, dataInstalacao, contInstalacao, dataRetirada, contRetirada, idItem, idImpressora });
    } catch (error) {
        console.error('Error creating instalacao:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:idInstalacao', async (req, res) => {
    const { idInstalacao } = req.params;
    const { localInstalacao, endereco, transformador, responsavel, ip, dataInstalacao, contInstalacao, dataRetirada, contRetirada, idItem, idImpressora } = req.body;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'UPDATE instalacoes SET localInstalacao = ?, endereco = ?, transformador = ?, responsavel = ?, ip = ?, dataInstalacao = ?, contInstalacao = ?, dataRetirada = ?, contRetirada = ?, idItem = ?, idImpressora = ? WHERE idInstalacao = ?',
            [localInstalacao, endereco, transformador, responsavel, ip, dataInstalacao, contInstalacao, dataRetirada, contRetirada, idItem, idImpressora, idInstalacao]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Instalacao não encontrada' });
        }

        res.json({ idInstalacao, localInstalacao, endereco, transformador, responsavel, ip, dataInstalacao, contInstalacao, dataRetirada, contRetirada, idItem, idImpressora });
    } catch (error) {
        console.error('Error updating instalacao:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:idInstalacao', async (req, res) => {
    const { idInstalacao } = req.params;

    try {
        const connection = await db.getConnection();
        const [result] = await connection.execute(
            'DELETE FROM instalacoes WHERE idInstalacao = ?',
            [idInstalacao]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Instalacao não encontrada' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting instalacao:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
