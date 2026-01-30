# InsaengStock Blueprint

## Overview

A high-performance stock analysis tool that uses a rule-based engine to identify Buy/Sell opportunities in KOSPI and NASDAQ markets based on RSI, PSR, PBR, and sales growth metrics. The application will be a modern, single-page web application built with HTML, CSS, and JavaScript, following the principles of Web Components for a modular and maintainable structure.

## Design and Features

*   **UI/UX:** A clean, modern, and responsive design. The layout will be based on cards, with each card representing a stock. The application will be divided into two main sections: KOSPI and NASDAQ.
*   **Stock Card:** Each stock card will display:
    *   Stock Ticker and Name
    *   Current Price
    *   RSI (Relative Strength Index)
    *   PSR (Price to Sales Ratio)
    *   PBR (Price to Book-value Ratio)
    *   Sales Growth (%)
    *   A clear "Buy", "Sell", or "Hold" recommendation.
*   **Recommendation Engine:**
    *   **Buy:** When RSI < 50, PSR < 20, PBR < 30, and Sales Growth is positive.
    *   **Sell:** When RSI > 70 (as a starting point for overbought).
    *   **Hold:** If neither "Buy" nor "Sell" conditions are met.

## Technical Plan

1.  **Project Scaffolding:** Create `index.html`, `style.css`, and `main.js`.
2.  **HTML Structure (`index.html`):**
    *   Set up the main container for the application.
    *   Define templates for the `<stock-card>` web component.
    *   Include sections for KOSPI and NASDAQ.
3.  **Styling (`style.css`):**
    *   Implement the modern, card-based design.
    *   Use CSS variables for theming.
    *   Ensure the layout is responsive using Flexbox or CSS Grid.
4.  **Core Logic (`main.js`):**
    *   Define the `StockCard` custom element (Web Component).
    *   Implement a `data_fetcher.js` module to get stock data using the `google_web_search` tool.
    *   Implement a `rules_engine.js` module to apply the buy/sell logic.
    *   The main script will:
        *   Fetch a list of top KOSPI and NASDAQ stocks.
        *   For each stock, fetch its financial metrics.
        *   Apply the rules engine to get a recommendation.
        *   Dynamically create and insert `<stock-card>` elements into the DOM.
5.  **Initial Stock List:**
    *   **KOSPI:** Samsung Electronics, SK Hynix, LG Energy Solution, Hyundai Motor, Naver.
    *   **NASDAQ:** Apple, Microsoft, Amazon, NVIDIA, Tesla.

## Current Task

*   Scaffold the basic project files.
