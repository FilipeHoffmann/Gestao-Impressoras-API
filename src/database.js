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
            return connection;
        } catch (error) {
            console.error('Error getting database connection:', error.message);
            throw error;
        }
    }

    async closePool() {
        try {
            await this.pool.end();
        } catch (error) {
            console.error('Error closing database pool:', error.message);
            throw error;
        }
    }
}

module.exports = Database;
