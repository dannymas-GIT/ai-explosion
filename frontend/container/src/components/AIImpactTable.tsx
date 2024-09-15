import React from 'react';

const AIImpactTable: React.FC = () => {
  const impactData = [
    { metric: 'Productivity Increase', value: '35%' },
    { metric: 'Cost Reduction', value: '25%' },
    { metric: 'Decision Accuracy', value: '40%' },
    { metric: 'Customer Satisfaction', value: '30%' },
  ];

  return (
    <table className="ai-impact-table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Impact</th>
        </tr>
      </thead>
      <tbody>
        {impactData.map((item, index) => (
          <tr key={index}>
            <td>{item.metric}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AIImpactTable;