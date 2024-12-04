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
    ssl: process.env.POSTGRES_SSL === 'true',
    connectionTimeoutMillis: 10000, // 10 seconds timeout
    idleTimeoutMillis: 30000, // 30 seconds idle timeout
    max: 20 // 20 connections
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

const DATABASE_TIMEOUT = 10000;
const MAX_RESPONSE_LENGTH = 10000; // 10000 characters

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

            // Get a client from the pool
            const client = await pool.connect();

            const result = await Promise.race([
                client.query(query),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout: Database query took too long')), DATABASE_TIMEOUT))
            ]) as pkg.QueryResult;

            client.release();

            if (result instanceof Error) {
                return result.message;
            }
            
            const jsonResult = JSON.stringify(result.rows);

            // Check if the result is too long
            if (jsonResult.length > MAX_RESPONSE_LENGTH) {
                return `Query result is too large (${jsonResult.length} characters). Please refine your query.`;
            }

            return jsonResult;
        } catch (error) {
            if (error instanceof Error) {
                ConsoleLogger.error(`Database query error: ${error.message}`);
                return `Error executing query: ${error.message}`;
            }
            return 'An unknown error occurred';
        }
    }
}
