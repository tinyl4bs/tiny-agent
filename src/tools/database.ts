import pkg from 'pg';
const { Pool } = pkg;
import { ITool } from "../types.ts";
import { ConsoleLogger } from '../console.ts';

import 'dotenv/config';

// Create a connection pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    ssl: process.env.POSTGRES_SSL === 'true'
});

// Test the connection on startup
pool.connect((err, client, release) => {
    if (err) {
        ConsoleLogger.error('Error connecting to database: ' + err.message);
        return;
    }
    release();
    ConsoleLogger.success('Connected to PostgreSQL database');
});

export const databaseTool: ITool = {
    name: 'DATABASE',
    description: 'Use the database to retrieve information using SQL queries',
    similies: ['DATABASE', 'DATABASE_TOOL', 'SQL', 'QUERY'],
    inputFormat: '<sql query>',
    inputExamples: [],
    execute: async (query: string) => {
        try {
            // Basic SQL injection prevention
            if (query.toLowerCase().includes('drop') || 
                query.toLowerCase().includes('delete') || 
                query.toLowerCase().includes('truncate') ||
                query.toLowerCase().includes('alter') ||
                query.toLowerCase().includes('create')) {
                throw new Error('Unsafe SQL query detected');
            }

            // test the connection
            await pool.connect();

            const result = await pool.query(query);
            return JSON.stringify(result.rows);
        } catch (error) {
            if (error instanceof Error) {
                ConsoleLogger.error(`Database query error: ${error.message}`);
                return `Error executing query: ${error.message}`;
            }
            return 'An unknown error occurred';
        }
    }
}
