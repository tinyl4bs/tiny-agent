import { ITool } from "../types.ts";

import 'dotenv/config';

const braveApiKey = process.env.BRAVE_API_KEY;
const braveUrl = 'https://api.search.brave.com/res/v1/web/search';

async function braveSearch(query: string): Promise<string> {
    const response = await fetch(`${braveUrl}?q=${encodeURIComponent(query)}&summary=1`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip',
            'X-Subscription-Token': braveApiKey,
        } as HeadersInit,
    });

    return response.json();
}

export const searchTool: ITool = {
    name: 'SEARCH',
    description: 'Search the web for relevant information',
    similies: ['SEARCH', 'SEARCH_TOOL', 'LOOKUP', 'GOOGLE', 'LOOK_UP'],
    inputFormat: '<string>',
    inputExamples: [],
    execute: async (query: string) => {
        const result = await braveSearch(query);

        // Scrape the results
        // TODO: Implement scraping

        return result;
    }
}
