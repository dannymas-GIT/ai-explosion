import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  name: string;
  value: number;
}

function App() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: 'Value',
        data: data.map(d => d.value),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <div style={{ width: '600px', height: '300px' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default App;
