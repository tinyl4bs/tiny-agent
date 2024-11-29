import { IClient, IAgentRuntime } from '../types.ts';
import { ConsoleLogger } from '../console.ts';
import { formatMessageHistory } from '../context.ts';

export abstract class BaseClient implements IClient {
    id: string;
    runtime: IAgentRuntime;
    
    constructor(runtime: IAgentRuntime) {
        this.id = crypto.randomUUID();
        this.runtime = runtime;
    }

    abstract connect(): Promise<void>;
    abstract disconnect(): Promise<void>;
    abstract sendMessage(message: string): Promise<void>;

    async handleMessage(message: string): Promise<void> {
        try {
            this.runtime.addMessage({
                role: 'user',
                content: message,
                timestamp: new Date()
            });

            ConsoleLogger.debug(`CLIENT[${this.id}] Message history: ${formatMessageHistory(this.runtime.getMessageHistory())}`);

            this.runtime.updateState({
                scratchpad: this.runtime.getState().scratchpad + `\nQuestion: ${message}`,
                completed: false,
                finalAnswer: null,
                messageHistory: formatMessageHistory(this.runtime.getMessageHistory())
            });

            await this.runtime.run(this.runtime.getState());

            const state = this.runtime.getState();
            if (state.finalAnswer) {
                await this.sendMessage(state.finalAnswer);
            }
        } catch (error) {
            ConsoleLogger.error(`Error handling message: ${error}`);
            await this.sendMessage('Sorry, I encountered an error processing your request.');
        }
    }
}
