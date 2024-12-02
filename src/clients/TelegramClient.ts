import { Telegraf, Context } from 'telegraf';
import { BaseClient } from './BaseClient.ts';
import { IAgentRuntime } from '../types.ts';
import { ConsoleLogger } from '../console.ts';

export class TelegramClient extends BaseClient {
    private bot: Telegraf;
    private token: string;
    private isActive: boolean = false;
    private currentChatId?: number;
    private startTime: number = 0;
    private messageBuffer: Map<number, {
        messages: string[];
        timer: NodeJS.Timeout | null;
    }> = new Map();
    private readonly BUFFER_TIMEOUT = 3000; // 3 seconds window to combine messages

    constructor(runtime: IAgentRuntime, token: string) {
        super(runtime);
        this.token = token;
        this.bot = new Telegraf(token, {handlerTimeout: 9_000_000});
    }

    private async showTyping(ctx: Context): Promise<void> {
        if (ctx.chat?.id) {
            await this.bot.telegram.sendChatAction(ctx.chat.id, 'typing');
        }
    }

    // Keep showing typing indicator every 4 seconds until the promise resolves
    private async showTypingUntilResponse(ctx: Context, promise: Promise<any>): Promise<any> {
        const typingInterval = setInterval(async () => {
            await this.showTyping(ctx);
        }, 4000);

        try {
            const result = await promise;
            clearInterval(typingInterval);
            return result;
        } catch (error) {
            clearInterval(typingInterval);
            throw error;
        }
    }

    async connect(): Promise<void> {
        ConsoleLogger.info(`CLIENT[${this.id}] Connecting to Telegram`);
        ConsoleLogger.success(`CLIENT[${this.id}] Telegram client started with id: ${this.id}`);
        this.isActive = true;
        this.startTime = Date.now();
        try {
            // Setup message handler
            this.bot.on('text', async (ctx) => {
                // Ignore if not active, if it's a command, or if message is from before bot start
                if (!this.isActive || 
                    ctx.message.text.startsWith('/') || 
                    ctx.message.date * 1000 < this.startTime) {
                    return;
                }

                try {
                    const message = ctx.message.text;
                    const chatId = ctx.chat.id;
                    
                    // Handle message through buffer system
                    await this.handleMessageBuffer(chatId, message);
                } catch (error) {
                    ConsoleLogger.error(`CLIENT[${this.id}] Error handling message: ${error}`);
                    await ctx.reply('Sorry, I encountered an error processing your request.');
                }
            });

            // Setup error handler
            this.bot.catch((err) => {
                ConsoleLogger.error(`CLIENT[${this.id}] Telegram Error: ${err}`);
            });

            // Launch bot
            await this.bot.launch();
            
            // Get bot info
            const botInfo = await this.bot.telegram.getMe();
            ConsoleLogger.success(`NEW Telegram client started with id: ${this.id}`);
            ConsoleLogger.success(`CLIENT[${this.id}] Bot username: @${botInfo.username}`);


        } catch (error) {
            ConsoleLogger.error(`CLIENT[${this.id}] Failed to connect Telegram client: ${error}`);
            throw error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            this.isActive = false;
            await this.bot.stop();
            ConsoleLogger.info(`CLIENT[${this.id}] Telegram client disconnected`);
        } catch (error) {
            ConsoleLogger.error(`CLIENT[${this.id}] Error disconnecting: ${error}`);
            throw error;
        }
    }

    async sendMessage(message: string): Promise<void> {
        // Add agent's message to buffer
        this.runtime.addMessage({
            role: 'agent',
            content: message,
            timestamp: new Date()
        });
    }

    private async handleMessageBuffer(chatId: number, message: string): Promise<void> {
        let buffer = this.messageBuffer.get(chatId);
        
        // Create new buffer if none exists
        if (!buffer) {
            buffer = {
                messages: [],
                timer: null
            };
            this.messageBuffer.set(chatId, buffer);
        }
        
        // Add message to buffer
        buffer.messages.push(message);
        
        // Clear existing timer if any
        if (buffer.timer) {
            clearTimeout(buffer.timer);
        }
        
        // Set new timer
        buffer.timer = setTimeout(async () => {
            const messages = buffer.messages;
            this.messageBuffer.delete(chatId);
            
            // Combine all messages with newlines
            const combinedMessage = messages.join('\n');
            
            try {
                // Show initial typing indicator
                await this.showTyping({ chat: { id: chatId } } as Context);
                
                // Handle the combined messages
                await this.showTypingUntilResponse(
                    { chat: { id: chatId } } as Context, 
                    this.handleMessage(combinedMessage)
                );
                
                // Get the final answer from state
                const state = this.runtime.getState();
                if (state.finalAnswer) {
                    await this.bot.telegram.sendMessage(chatId, state.finalAnswer);
                }
            } catch (error) {
                ConsoleLogger.error(`CLIENT[${this.id}] Error handling buffered messages: ${error}`);
                await this.bot.telegram.sendMessage(
                    chatId, 
                    'Sorry, I encountered an error processing your request.'
                );
            }
        }, this.BUFFER_TIMEOUT);
    }
}