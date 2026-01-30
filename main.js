import { fetchAllStockData } from './data_fetcher.js';

class StockCard extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('stock-card-template').content;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.cloneNode(true));

        // Move styles into shadow DOM to encapsulate the component's styling
        const style = document.createElement('style');
        style.textContent = `
            .stock-card {
                background-color: var(--surface-color, #1E1E1E);
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                transition: transform 0.2s ease-in-out;
                color: var(--primary-text-color, #E0E0E0);
            }
            .stock-card:hover {
                transform: translateY(-5px);
            }
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }
            .stock-name {
                font-size: 1.5rem;
                margin: 0;
            }
            .stock-ticker {
                font-size: 1rem;
                color: var(--secondary-text-color, #BDBDBD);
            }
            .metric {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
            }
            .metric-label {
                font-weight: bold;
            }
            .card-footer {
                margin-top: 16px;
                text-align: center;
            }
            .recommendation {
                font-size: 1.25rem;
                font-weight: bold;
                padding: 10px;
                border-radius: 4px;
                color: #fff;
            }
            .recommendation.buy { background-color: var(--buy-color, #4CAF50); }
            .recommendation.sell { background-color: var(--sell-color, #F44336); }
            .recommendation.hold { background-color: var(--hold-color, #FFC107); color: #000; }
            .recommendation.n\\/a { background-color: #808080; }
        `;
        shadowRoot.appendChild(style);
    }

    connectedCallback() {
        const shadowRoot = this.shadowRoot;
        shadowRoot.querySelector('.stock-name').textContent = this.getAttribute('name');
        shadowRoot.querySelector('.stock-ticker').textContent = this.getAttribute('ticker');
        shadowRoot.querySelector('.rsi').textContent = this.getAttribute('rsi');
        shadowRoot.querySelector('.psr').textContent = this.getAttribute('psr');
        shadowRoot.querySelector('.pbr').textContent = this.getAttribute('pbr');
        shadowRoot.querySelector('.sales-growth').textContent = this.getAttribute('sales-growth');

        const recommendation = shadowRoot.querySelector('.recommendation');
        const recommendationText = this.getAttribute('recommendation');
        recommendation.textContent = recommendationText;
        recommendation.className = 'recommendation'; // Reset classes
        recommendation.classList.add(recommendationText.toLowerCase());
    }
}

customElements.define('stock-card', StockCard);

function displayStocks(stocks, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content
    stocks.forEach(stock => {
        const stockCard = document.createElement('stock-card');
        stockCard.setAttribute('name', stock.name);
        stockCard.setAttribute('ticker', stock.ticker);
        stockCard.setAttribute('rsi', stock.rsi);
        stockCard.setAttribute('psr', stock.psr);
        stockCard.setAttribute('pbr', stock.pbr);
        stockCard.setAttribute('sales-growth', stock.salesGrowth);
        stockCard.setAttribute('recommendation', stock.recommendation);
        container.appendChild(stockCard);
    });
}

async function updateAndDisplayStocks() {
    const loader = document.querySelector('.loader');
    const mainContent = document.querySelectorAll('section');

    loader.classList.remove('hidden');
    mainContent.forEach(section => section.classList.add('hidden'));

    const { kospiStocks, nasdaqStocks } = await fetchAllStockData();
    
    displayStocks(kospiStocks, 'kospi-stocks');
    displayStocks(nasdaqStocks, 'nasdaq-stocks');

    loader.classList.add('hidden');
    mainContent.forEach(section => section.classList.remove('hidden'));
}

updateAndDisplayStocks();
