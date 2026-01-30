// For now, this file contains placeholder data.
// In the future, it will be responsible for fetching real data.

export const kospiStocks = [
    { name: 'Samsung Electronics', ticker: '005930', rsi: '45', psr: '1.8', pbr: '1.2', salesGrowth: '5%', recommendation: 'Buy' },
    { name: 'SK Hynix', ticker: '000660', rsi: '60', psr: '2.5', pbr: '1.5', salesGrowth: '-2%', recommendation: 'Hold' },
];

export const nasdaqStocks = [
    { name: 'Apple', ticker: 'AAPL', rsi: '55', psr: '6.5', pbr: '40', salesGrowth: '8%', recommendation: 'Hold' },
    { name: 'NVIDIA', ticker: 'NVDA', rsi: '80', psr: '35', pbr: '50', salesGrowth: '50%', recommendation: 'Sell' },
    { name: 'Tesla', ticker: 'TSLA', rsi: '48', psr: '8', pbr: '9', salesGrowth: '15%', recommendation: 'Buy' },
];

export async function fetchAllStockData() {
    return { kospiStocks, nasdaqStocks };
}