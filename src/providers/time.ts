import { IProvider } from "../types.ts";

export const timeProvider: IProvider = {
    name: 'Time Provider',
    description: 'Use to get the current time',
    run: async () => {
        return `Current time: ${new Date().toISOString()}`;
    }
}   