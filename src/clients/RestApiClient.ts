import express, { Express, Request, Response } from 'express';
import { BaseClient } from './BaseClient.ts';
import { IAgentRuntime } from '../types.ts';
import { ConsoleLogger } from '../console.ts';

export class RestApiClient extends BaseClient {
    private app: Express;
    private port: number;
    private server: any;

    constructor(runtime: IAgentRuntime, port: number = 3000) {
        super(runtime);
        this.port = port;
        this.app = express();
        this.app.use(express.json());
    }

    async connect(): Promise<void> {
        // Setup routes
        this.app.post('/ask', async (req: Request, res: Response) => {
            try {
                const { message } = req.body;
                if (!message) {
                    res.status(400).json({ error: 'Message is required' });
                    return;
                }

                // Handle the message using BaseClient implementation
                await this.handleMessage(message);

                // Get the final answer
                const state = this.runtime.getState();
                if (state.finalAnswer) {
                    res.json({ 
                        answer: state.finalAnswer,
                    });
                } else {
                    res.status(500).json({ error: 'No answer generated' });
                }
            } catch (error) {
                ConsoleLogger.error(`CLIENT[${this.id}] Error processing request: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        // Start server
        return new Promise((resolve) => {
            this.server = this.app.listen(this.port, () => {
                ConsoleLogger.success(`NEW REST API client started with id: ${this.id}`);
                ConsoleLogger.success(`CLIENT[${this.id}] listening on port ${this.port}`);
                resolve();
            });
        });
    }

    async disconnect(): Promise<void> {
        return new Promise((resolve) => {
            this.server?.close(() => {
                ConsoleLogger.info(`CLIENT[${this.id}] REST API client disconnected`);
                resolve();
            });
        });
    }

    async sendMessage(message: string): Promise<void> {
        // Update message history with the answer
        this.runtime.addMessage({
            role: 'agent',
            content: message,
            timestamp: new Date()
        });
    }
} 