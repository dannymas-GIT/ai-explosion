import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Natural Language Processing', value: 30 },
  { name: 'Computer Vision', value: 25 },
  { name: 'Reinforcement Learning', value: 20 },
  { name: 'Machine Learning', value: 15 },
  { name: 'Other AI Applications', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AIUseCasesPieChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value}%`, name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AIUseCasesPieChart;
