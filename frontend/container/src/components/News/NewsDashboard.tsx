import React from 'react';
import DashboardLayout from '../DashboardLayout';
import AIAdoptionChart from '../AIAdoptionChart';
import AIUseCasesPieChart from '../AIUseCasesPieChart';
import AIImpactTable from '../AIImpactTable';
import AITrendsForecastChart from '../AITrendsForecastChart';

const NewsDashboard: React.FC = () => {
  const leftColumn = (
    <>
      <section className="dashboard-cell">
        <h2>AI in News Trends</h2>
        <AIAdoptionChart />
      </section>
      <section className="dashboard-cell">
        <h2>AI News Sources</h2>
        <AIUseCasesPieChart />
      </section>
    </>
  );

  const rightColumn = (
    <>
      <section className="dashboard-cell">
        <h2>AI Impact on News Industry</h2>
        <AIImpactTable />
      </section>
      <section className="dashboard-cell">
        <h2>AI in News Forecast</h2>
        <AITrendsForecastChart />
      </section>
    </>
  );

  return (
    <DashboardLayout
      leftColumn={leftColumn}
      rightColumn={rightColumn}
    />
  );
};

export default NewsDashboard;