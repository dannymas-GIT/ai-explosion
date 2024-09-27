import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import AIAdoptionChart from '../AIAdoptionChart';
import AIImpactTable from '../AIImpactTable';
import AITrendsForecastChart from '../AITrendsForecastChart';

const FinanceDashboard: React.FC = () => {
  const leftColumn = (
    <>
      <section className="dashboard-cell">
        <h2>Finance AI Adoption Trends</h2>
        <AIAdoptionChart />
      </section>
      <section className="dashboard-cell">
        <h2>Finance Tools</h2>
        <ul>
          <li><Link to="/finance/stocks">Stock Monitor</Link></li>
          <li><Link to="/finance/account">Account Management</Link></li>
        </ul>
      </section>
    </>
  );

  const rightColumn = (
    <>
      <section className="dashboard-cell">
        <h2>AI Impact on Finance Industry</h2>
        <AIImpactTable />
      </section>
      <section className="dashboard-cell">
        <h2>Finance AI Trends Forecast</h2>
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

export default FinanceDashboard;