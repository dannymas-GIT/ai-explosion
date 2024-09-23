import React from 'react';
import SearchComponent from '../Search/SearchComponent';
import AIAdoptionChart from '../AIAdoptionChart';
import AIImpactTable from '../AIImpactTable';
import AIInvestmentBarChart from '../AIInvestmentBarChart';
import AIJobsLineGraph from '../AIJobsLineGraph';
import AIUseCasesPieChart from '../AIUseCasesPieChart';
import AITrendsForecastChart from '../AITrendsForecastChart';
import LiveKitComponent from '../LiveKit/LiveKitComponent';

const NewsDashboard: React.FC = () => {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-column left-column">
        <section className="dashboard-cell">
          <h2>News Adoption Trends</h2>
          <AIAdoptionChart />
        </section>
        <section className="dashboard-cell">
          <h2>News Investment Overview</h2>
          <AIInvestmentBarChart />
        </section>
        <section className="dashboard-cell">
          <h2>News Use Cases Distribution</h2>
          <AIUseCasesPieChart />
        </section>
      </div>
      <div className="dashboard-column center-column">
        <section className="dashboard-cell search-cell">
          <h2>News-Powered Search</h2>
          <SearchComponent />
        </section>
        <section className="dashboard-cell">
          <h2>LiveKit Integration</h2>
          <LiveKitComponent />
        </section>
      </div>
      <div className="dashboard-column right-column">
        <section className="dashboard-cell">
          <h2>News Job Market Trends</h2>
          <AIJobsLineGraph />
        </section>
        <section className="dashboard-cell">
          <h2>News Impact on Industries</h2>
          <AIImpactTable />
        </section>
        <section className="dashboard-cell">
          <h2>News Trends Forecast</h2>
          <AITrendsForecastChart />
        </section>
      </div>
    </div>
  );
};

export default NewsDashboard;