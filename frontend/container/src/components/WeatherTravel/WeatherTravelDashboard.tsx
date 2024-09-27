import React from 'react';
import DashboardLayout from '../DashboardLayout';
import AIAdoptionChart from '../AIAdoptionChart';
import AIUseCasesPieChart from '../AIUseCasesPieChart';
import AIImpactTable from '../AIImpactTable';
import AITrendsForecastChart from '../AITrendsForecastChart';

const WeatherTravelDashboard: React.FC = () => {
  const leftColumn = (
    <>
      <section className="dashboard-cell">
        <h2>Weather & Travel AI Trends</h2>
        <AIAdoptionChart />
      </section>
      <section className="dashboard-cell">
        <h2>Weather & Travel AI Use Cases</h2>
        <AIUseCasesPieChart />
      </section>
    </>
  );

  const rightColumn = (
    <>
      <section className="dashboard-cell">
        <h2>AI Impact on Weather & Travel</h2>
        <AIImpactTable />
      </section>
      <section className="dashboard-cell">
        <h2>Weather & Travel AI Forecast</h2>
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

export default WeatherTravelDashboard;