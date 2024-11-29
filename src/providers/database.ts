import { databaseTool } from "../tools/database.ts";
import { IProvider } from "../types.ts";
import { ConsoleLogger } from '../console.ts';

const SCHEMA_QUERY = `
    SELECT 
        t.table_name,
        array_agg(
            json_build_object(
                'column_name', c.column_name,
                'data_type', c.data_type,
                'is_nullable', c.is_nullable,
                'column_default', c.column_default
            )
        ) as columns
    FROM 
        information_schema.tables t
    JOIN 
        information_schema.columns c 
    ON 
        t.table_name = c.table_name
    WHERE 
        t.table_schema = 'public'
    GROUP BY 
        t.table_name;
`;

export const databaseProvider: IProvider = {
    name: 'Database Provider',
    description: 'Use to retrieve a specific database structure',
    run: async (query: string) => {
        try {
            // Get database structure
            const result = await Promise.race([
                databaseTool.execute(SCHEMA_QUERY),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout: Database query took too long')), 5000))
            ]);
            
            // Parse the result
            const tables = JSON.parse(result);
            
            // Format the structure in a readable way for the agent
            const formattedStructure = tables.map((table: any) => {
                const columns = table.columns.map((col: any) => {
                    return `    - ${col.column_name} (${col.data_type})${col.is_nullable === 'YES' ? ' NULL' : ' NOT NULL'}${col.column_default ? ` DEFAULT ${col.column_default}` : ''}`;
                }).join('\n');

                return `Table: ${table.table_name}\nColumns:\n${columns}\n`;
            }).join('\n');

            return `Database Structure:\n${formattedStructure}`;
        } catch (error) {
            if (error instanceof Error) {
                ConsoleLogger.error(`Database provider error: ${error.message}`);
                return `Error retrieving database structure: ${error.message}`;
            }
            return 'An unknown error occurred while retrieving database structure';
        }
    }
}