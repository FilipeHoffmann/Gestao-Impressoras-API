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
            queueLimit: 0,
            connectTimeout: 10000, 
        });
    }

    async getConnection() {
        try {
            const connection = await this.pool.getConnection();

            
            await connection.ping();

            console.log('Database connection established');
            return connection;
        } catch (error) {
            console.error('Error getting database connection:', error.message);
            await this.reconnect();
            throw error;
        }
    }

    async reconnect(retryCount = 5) {
        console.log('Attempting to reconnect to the database...');
        try {
            await this.closePool();

            
            while (retryCount > 0) {
                try {
                    this.pool = mysql.createPool({
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        waitForConnections: true,
                        connectionLimit: 10,
                        queueLimit: 0,
                        connectTimeout: 10000,
                    });
                    console.log('Reconnected to the database');
                    return;
                } catch (error) {
                    console.error(`Retry attempt failed: ${5 - retryCount + 1}`);
                    retryCount--;
                    await this.delay(2000); 
                }
            }
            console.error('All retry attempts failed');
            throw new Error('Unable to reconnect to the database');
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

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = Database;