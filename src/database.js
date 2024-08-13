const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async getConnection() {
        try {
            const connection = await this.pool.getConnection();
            console.log('Database connection established');
            return connection;
        } catch (error) {
            console.error('Error getting database connection:', error.message);
            await this.reconnect();
            throw error;
        }
    }

    async reconnect() {
        console.log('Attempting to reconnect to the database...');
        try {
            await this.closePool();
            this.pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            console.log('Reconnected to the database');
        } catch (error) {
            console.error('Error reconnecting to the database:', error.message);
            throw error;
        }
    }

    async closePool() {
        try {
            await this.pool.end();
            console.log('Database pool closed');
        } catch (error) {
            console.error('Error closing database pool:', error.message);
            throw error;
        }
    }
}

module.exports = Database;