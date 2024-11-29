import { OpenAI } from 'openai';

import 'dotenv/config';

export enum LLMModel {
    SMALL = 'gpt-4o-mini',
    LARGE = 'gpt-4o',
}

export class LLMEngine {

    private static instance: LLMEngine;
    private openai: OpenAI;

    private constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    // Get instance method
    public static getInstance(): LLMEngine {
        if (!LLMEngine.instance) {
            LLMEngine.instance = new LLMEngine();
        }
        return LLMEngine.instance;
    }

    public async generateText(prompt: string, model: LLMModel = LLMModel.SMALL, systemPrompt?: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: model,
            messages: [
                { role: 'system', content: systemPrompt ?? '' },
                { role: 'user', content: prompt }
            ],
        });

        return response.choices[0].message.content ?? '';
    }
}
