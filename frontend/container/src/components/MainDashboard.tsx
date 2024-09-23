import React from 'react';
import SearchComponent from './Search/SearchComponent';
import AIAdoptionChart from './AIAdoptionChart';
import AIImpactTable from './AIImpactTable';
import AIInvestmentBarChart from './AIInvestmentBarChart';
import AIJobsLineGraph from './AIJobsLineGraph';
import AIUseCasesPieChart from './AIUseCasesPieChart';
import AITrendsForecastChart from './AITrendsForecastChart';
import LiveKitVoiceAssistant from './LiveKit/LiveKitVoiceAssistant';

const MainDashboard: React.FC = () => {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-column left-column">
        <section className="dashboard-cell">
          <h2>AI Adoption Trends</h2>
          <AIAdoptionChart />
        </section>
        <section className="dashboard-cell">
          <h2>AI Investment Overview</h2>
          <AIInvestmentBarChart />
        </section>
      </div>
      <div className="dashboard-column center-column">
        <section className="dashboard-cell voice-assistant-cell">
          <LiveKitVoiceAssistant />
        </section>
        <section className="dashboard-cell search-cell">
          <SearchComponent />
        </section>
      </div>
      <div className="dashboard-column right-column">
        <section className="dashboard-cell">
          <h2>AI Job Market Trends</h2>
          <AIJobsLineGraph />
        </section>
        <section className="dashboard-cell">
          <h2>AI Impact on Industries</h2>
          <AIImpactTable />
        </section>
      </div>
    </div>
  );
};

export default MainDashboard;
