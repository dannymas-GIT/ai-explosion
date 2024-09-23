import React, { useState } from 'react';

const StockAnalysis: React.FC = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockData, setStockData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to fetch stock data
    console.log(`Fetching data for ${stockSymbol}`);
    // Placeholder: setStockData(fetchedData);
    setStockData({
      symbol: stockSymbol,
      price: 150.00,
      change: 2.5,
      volume: 1000000,
    });
  };

  return (
    <div className="stock-analysis">
      <h2>Stock Analysis</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          placeholder="Enter stock symbol"
        />
        <button type="submit">Analyze Stock</button>
      </form>
      {stockData && (
        <div className="stock-data">
          <h3>Stock Data for {stockData.symbol}</h3>
          <p>Price: ${stockData.price}</p>
          <p>Change: {stockData.change}%</p>
          <p>Volume: {stockData.volume}</p>
        </div>
      )}
    </div>
  );
};

export default StockAnalysis;
