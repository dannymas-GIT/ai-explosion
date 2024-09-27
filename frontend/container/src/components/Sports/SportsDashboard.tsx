import React from 'react';
import DashboardLayout from '../DashboardLayout';
import AIAdoptionChart from '../AIAdoptionChart';
import AIUseCasesPieChart from '../AIUseCasesPieChart';
import AIImpactTable from '../AIImpactTable';
import AITrendsForecastChart from '../AITrendsForecastChart';

const SportsDashboard: React.FC = () => {
  const leftColumn = (
    <>
      <section className="dashboard-cell">
        <h2>Sports AI Adoption Trends</h2>
        <AIAdoptionChart />
      </section>
      <section className="dashboard-cell">
        <h2>Sports AI Use Cases</h2>
        <AIUseCasesPieChart />
      </section>
    </>
  );

  const rightColumn = (
    <>
      <section className="dashboard-cell">
        <h2>AI Impact on Sports Industry</h2>
        <AIImpactTable />
      </section>
      <section className="dashboard-cell">
        <h2>Sports AI Trends Forecast</h2>
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

export default SportsDashboard;
