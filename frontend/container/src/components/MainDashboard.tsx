import React from 'react';
import SearchComponent from './Search/SearchComponent';
import AIAdoptionChart from './AIAdoptionChart';
import AIImpactTable from './AIImpactTable';
import AIInvestmentBarChart from './AIInvestmentBarChart';
import AIJobsLineGraph from './AIJobsLineGraph';
import AIUseCasesPieChart from './AIUseCasesPieChart';
import AITrendsForecastChart from './AITrendsForecastChart';
import LiveKitVoiceAssistant from './LiveKit/LiveKitVoiceAssistant';
import './MainDashboard.css'; // We'll create this file next

const MainDashboard: React.FC = () => {
  return (
    <div className="main-dashboard">
      <div className="dashboard-column">
        <div className="dashboard-cell">
          <h2>AI Adoption Trends</h2>
          <AIAdoptionChart />
        </div>
        <div className="dashboard-cell">
          <h2>AI Use Cases</h2>
          <AIUseCasesPieChart />
        </div>
      </div>
      <div className="dashboard-column center-column">
        <div className="dashboard-cell">
          <LiveKitVoiceAssistant />
        </div>
        <div className="dashboard-cell">
          <SearchComponent />
        </div>
        <div className="dashboard-cell">
          <h2>AI Investment Overview</h2>
          <AIInvestmentBarChart />
        </div>
      </div>
      <div className="dashboard-column">
        <div className="dashboard-cell">
          <h2>AI Job Market Trends</h2>
          <AIJobsLineGraph />
        </div>
        <div className="dashboard-cell">
          <h2>AI Impact on Industries</h2>
          <AIImpactTable />
        </div>
        <div className="dashboard-cell">
          <h2>AI Trends Forecast</h2>
          <AITrendsForecastChart />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
