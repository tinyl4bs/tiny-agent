import { ITool } from "../types.ts";

export const calculatorTool: ITool = {
    name: 'CALCULATOR',
    description: 'Evaluate a basic mathematical expression, using a basic eval() javascript function.',
    similies: ['CALCULATOR', 'CALCULATE'],
    inputFormat: '<mathematical expression>',
    inputExamples: ['1 + 1', '2 * 3', '10 / 2', '10 - 2'],
    execute: async (query: string) => {
        const result = eval(query);
        return result;
    }
}
