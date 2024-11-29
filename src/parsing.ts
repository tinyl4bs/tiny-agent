import { IAgentPersonality } from './types.ts';
import { ConsoleLogger } from './console.ts';
import fs from 'fs/promises';
import path from 'path';


// Parse JSON block output from the LLM
export function parseJSONBlock(response: string): any {
    const jsonBlock = response.match(/```json\s*([\s\S]*)\s*```/);
    if (jsonBlock) {
        return JSON.parse(jsonBlock[1]);
    }
    return null;
}

// Loads a personality from the personalities directory
export async function loadPersonality(name: string): Promise<IAgentPersonality | null> {
    try {
        const filePath = path.join(process.cwd(), 'src', 'agent', `${name}`);
        const data = await fs.readFile(filePath, 'utf8');
        const personalities = JSON.parse(data);
        
        return personalities || null;
    } catch (error) {
        ConsoleLogger.error(`Error loading personality: ${error}`);
        return null;
    }
}
