import { buildContext, formatMessageHistory, formatPersonality, formatTools, formatToolsList } from './context.ts';
import { LLMModel } from './llm-engine.ts';
import { ReactAgentRuntime } from './runtimes/reactRuntime.ts';
import * as Tools from './tools/index.ts';
import * as Providers from './providers/index.ts';
import { RestApiClient } from './clients/RestApiClient.ts';
import { loadPersonality } from './parsing.ts';
import { TelegramClient } from './clients/TelegramClient.ts';
import { ConsoleLogger } from './console.ts';
import { IAgentRuntime } from './types.ts';

// clear the console
console.clear();

const registeredRuntimes: IAgentRuntime[] = [];

const reactAgentRuntime = new ReactAgentRuntime();

const defaultTools = [Tools.calculatorTool, Tools.tickerPriceTool, Tools.databaseTool, Tools.ticker24hrTool, Tools.tickerAvgPriceTool];
const defaultProviders = [Providers.timeProvider, Providers.databaseProvider];

// Load the personality from command line argument --agent=<agent-filename>
// Parse commandline arguments

// TODO: implement this better
const args = process.argv.slice(2);
const agentArg = args.find(arg => arg.startsWith('--agent='));
if (!agentArg) {
    ConsoleLogger.error('No agent specified, use --agent=<agent-filename> to specify the agent');
    throw new Error('No agent specified');
}
const personality = await loadPersonality(agentArg.split('=')[1]);

if (!personality) {
    ConsoleLogger.error('Failed to load agent personality');
    throw new Error('Failed to load agent personality');
}

// set the state
reactAgentRuntime.updateState({
    model: LLMModel.LARGE,
    providers: defaultProviders,
    tools: formatTools(defaultTools),
    toolsList: formatToolsList(defaultTools),
    scratchpad: '',
    personality: formatPersonality(personality)
});

// Add tools
reactAgentRuntime.addTools(defaultTools);
// Add providers
reactAgentRuntime.addProviders(defaultProviders);

// Add and connect clients
const restApiClient = new RestApiClient(reactAgentRuntime, 3000);
reactAgentRuntime.addClient(restApiClient);
await restApiClient.connect();

if (process.env.TELEGRAM_API_KEY) {
    const telegramClient = new TelegramClient(reactAgentRuntime, process.env.TELEGRAM_API_KEY);
    reactAgentRuntime.addClient(telegramClient);
    await telegramClient.connect();
}


// Add the runtime to the list of registered runtimes
registeredRuntimes.push(reactAgentRuntime);

// Setup shutdown handlers
process.on('SIGTERM', () => {
    ConsoleLogger.info('SIGTERM signal received');
    for (const runtime of registeredRuntimes) {
        runtime.disconnectAllClients();
    }
});

process.on('SIGINT', () => {
    ConsoleLogger.info('SIGINT signal received');
    for (const runtime of registeredRuntimes) {
        runtime.disconnectAllClients();
    }
});


