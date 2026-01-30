async function getStockMetric(query, metricRegex) {
    console.log(`Fetching ${query}...`);
    try {
        // Assuming google_web_search is a globally available function
        const searchResults = await google_web_search(query);
        const match = searchResults.match(metricRegex);
        if (match && match[1]) {
            const value = parseFloat(match[1]);
            console.log(`Found value for ${query}: ${value}`);
            return value;
        }
        console.log(`Could not find value for ${query}`);
    } catch (error) {
        console.error(`Error fetching ${query}:`, error);
    }
    return null;
}

const stocks = {
    kospi: [
        { name: 'Samsung Electronics', ticker: '005930' },
        { name: 'SK Hynix', ticker: '000660' },
        { name: 'LG Energy Solution', ticker: '373220' },
        { name: 'Hyundai Motor', ticker: '005380' },
        { name: 'Naver', ticker: '035420' },
    ],
    nasdaq: [
        { name: 'Apple', ticker: 'AAPL' },
        { name: 'Microsoft', ticker: 'MSFT' },
        { name: 'Amazon', ticker: 'AMZN' },
        { name: 'NVIDIA', ticker: 'NVDA' },
        { name: 'Tesla', ticker: 'TSLA' },
    ]
};

export async function fetchAllStockData() {
    const allStocks = [...stocks.kospi, ...stocks.nasdaq];
    const promises = allStocks.map(stock => (async () => {
        console.log(`--- Fetching data for ${stock.name} ---`);
        const rsi = await getStockMetric(`${stock.name} ${stock.ticker} RSI`, /(?:RSI\s*(?:is|as|of)?)\s*(\d{1,3}(?:\.\d+)?)/i);
        const psr = await getStockMetric(`${stock.name} ${stock.ticker} PSR`, /(?:PSR\s*(?:is|as|of)?)\s*(\d{1,3}(?:\.\d+)?)/i);
        const pbr = await getStockMetric(`${stock.name} ${stock.ticker} PBR`, /(?:PBR\s*(?:is|as|of)?)\s*(\d{1,3}(?:\.\d+)?)/i);
        const salesGrowth = await getStockMetric(`${stock.name} ${stock.ticker} sales growth`, /(?:sales growth\s*(?:is|as|of)?)\s*(-?\d{1,3}(?:\.\d+)?)/i);
        
        console.log(`--- Finished fetching data for ${stock.name} ---`);
        return {
            ...stock,
            rsi,
            psr,
            pbr,
            salesGrowth,
            recommendation: getRecommendation({ rsi, psr, pbr, salesGrowth })
        };
    })());

    const allStockData = await Promise.all(promises);
    
    const kospiStocks = allStockData.filter(stock => stocks.kospi.some(k => k.ticker === stock.ticker));
    const nasdaqStocks = allStockData.filter(stock => stocks.nasdaq.some(n => n.ticker === stock.ticker));

    return { kospiStocks, nasdaqStocks };
}

function getRecommendation({ rsi, psr, pbr, salesGrowth }) {
    if (rsi === null || psr === null || pbr === null || salesGrowth === null) {
        return 'N/A';
    }

    if (rsi < 50 && psr < 20 && pbr < 30 && salesGrowth > 0) {
        return 'Buy';
    } else if (rsi > 70) {
        return 'Sell';
    } else {
        return 'Hold';
    }
}