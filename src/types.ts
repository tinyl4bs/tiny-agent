// This module defines interfaces and types used in the application for tools, providers, agent runtime, and state management.

// Importing the LLMEngine class from the llm-engine module
import { LLMEngine } from "./llm-engine.ts";

// ITool interface represents a tool that can be executed with a specific input format.
// It includes properties for the tool's name, description, similar terms, input format, and an execute method.
export interface ITool {
    name: string; // The name of the tool
    description: string; // A brief description of what the tool does
    similies: string[]; // An array of similar terms or aliases for the tool
    inputFormat: string; // The expected input format for the tool
    inputExamples: string[]; // An array of examples of how to use the tool
    execute: (...args: any[]) => Promise<any>; // A method that executes the tool with the provided arguments and returns a promise
}

// IProvider interface represents a provider that can run a specific operation.
// It includes properties for the provider's name, description, and a run method.
// It is used to provide additional context information for the agent.
export interface IProvider {
    name: string; // The name of the provider
    description: string; // A brief description of what the provider does
    run: (...args: any[]) => Promise<any>; // A method that runs the provider's operation with the provided arguments and returns a promise
}

// IAgentRuntime interface represents the runtime environment for an agent.
// It includes a reference to the LLMEngine, the current state, and a method to run the agent with the given state and arguments.
export interface IAgentRuntime {
    readonly llmEngine: LLMEngine; // The LLMEngine instance used by the agent
    state: State; // The current state of the agent
    messageBuffer: Message[]; // The message buffer of the agent
    run: (state: State, ...args: any[]) => Promise<void>; // A method that runs the agent with the provided state and arguments
    updateState: (state: State) => void; // A method that updates the state of the agent
    getState: () => State; // A method that returns the current state of the agent
    addMessage: (message: Message) => void; // A method that adds a message to the message buffer
    getMessageHistory: () => Message[]; // A method that returns the message history of the agent
    disconnectAllClients: () => void; // A method that disconnects all clients from the agent runtime
}

// State type represents a flexible object that can hold any key-value pairs.
// It is used to manage the state of the agent or tool.
export type State = {
    [key: string]: any; // A record of key-value pairs where keys are strings and values can be of any type
}

// IClient interface represents a client that can connect to an agent runtime.
export interface IClient {
    id: string; // The ID of the client
    runtime: IAgentRuntime; // The agent runtime instance
    connect(): Promise<void>; // A method that connects the client to the agent runtime
    disconnect(): Promise<void>; // A method that disconnects the client from the agent runtime
    handleMessage(message: string): Promise<void>; // A method that handles a message from the client
    sendMessage(message: string): Promise<void>; // A method that sends a message to the client
}

// Message type represents a message sent between the agent and a client.
export interface Message {
    role: 'user' | 'agent'; // The role of the message sender
    content: string; // The content of the message  
    timestamp: Date; // The timestamp of the message
}

// IAgentPersonality interface represents the personality of an agent.
export interface IAgentPersonality {
    name: string; // The name of the agent  
    bio: string[]; // The biography of the agent
    lore: string[]; // The background lore of the agent
    style: string[]; // The personality style of the agent
    rules: string[]; // The rules of the agent
}
