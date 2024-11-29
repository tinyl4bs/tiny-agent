import { ITool } from '../types.ts';

const BASE_URL = 'https://data-api.binance.vision/api/v3';
// Public endpoints
enum Public {
    AGG_TRADES = `${BASE_URL}/aggTrades`,
    AVG_PRICE = `${BASE_URL}/avgPrice`,
    DEPTH = `${BASE_URL}/depth`,
    EXCHANGE_INFO = `${BASE_URL}/exchangeInfo`,
    KLINES = `${BASE_URL}/klines`,
    PING = `${BASE_URL}/ping`,
    TICKER = `${BASE_URL}/ticker`,
    TICKER_24HR = `${BASE_URL}/ticker/24hr`,
    TICKER_BOOK_TICKER = `${BASE_URL}/ticker/bookTicker`,
    TICKER_PRICE = `${BASE_URL}/ticker/price`,
    TIME = `${BASE_URL}/time`,
    TRADES = `${BASE_URL}/trades`,
    UI_KLINES = `${BASE_URL}/uiKlines`,
};

const getListOfSymbols = async () => {
    const response = await fetch(Public.TICKER_PRICE);
    const data = await response.json();
    return data.symbols.map((symbol: any) => symbol.symbol);
};

export const tickerPriceTool: ITool = {
    name: 'TICKER_PRICE',
    similies: ['TICKER_PRICE', 'BINANCE_TICKER_PRICE', 'TOKEN_PRICE'],
    description: 'Get the price of a symbol from Binance public API',
    inputFormat: '<string>',
    inputExamples: ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'],
    execute: async (query: string) => {
        const response = await fetch(`${Public.TICKER_PRICE}?symbol=${query}`);
        const data = await response.json();
        return JSON.stringify(data);
    },
};
