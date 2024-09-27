import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

const StockMonitor: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [newStock, setNewStock] = useState('');

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/stocks');
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const addStock = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/stocks', { symbol: newStock });
      setNewStock('');
      fetchStocks();
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  const removeStock = async (symbol: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/stocks/${symbol}`);
      fetchStocks();
    } catch (error) {
      console.error('Error removing stock:', error);
    }
  };

  return (
    <div className="stock-monitor">
      <h2>Stock Monitor</h2>
      <form onSubmit={addStock}>
        <input
          type="text"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="Enter stock symbol"
        />
        <button type="submit">Add Stock</button>
      </form>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.symbol}: ${stock.price} ({stock.change > 0 ? '+' : ''}{stock.change}%)
            <button onClick={() => removeStock(stock.symbol)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockMonitor;
