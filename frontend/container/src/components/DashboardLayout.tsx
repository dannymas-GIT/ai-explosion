import React, { ReactNode } from 'react';
import SearchComponent from './Search/SearchComponent';
import LiveKitVoiceAssistant from './LiveKit/LiveKitVoiceAssistant';
import AIInvestmentBarChart from './AIInvestmentBarChart';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ leftColumn, rightColumn }) => {
  return (
    <div className="dashboard-grid">
      <div className="dashboard-column left-column">
        {leftColumn}
      </div>
      <div className="dashboard-column center-column">
        <section className="dashboard-cell voice-assistant-cell">
          <LiveKitVoiceAssistant />
        </section>
        <section className="dashboard-cell search-cell">
          <SearchComponent />
        </section>
        <section className="dashboard-cell">
          <h2>AI Investment Overview</h2>
          <AIInvestmentBarChart />
        </section>
      </div>
      <div className="dashboard-column right-column">
        {rightColumn}
      </div>
    </div>
  );
};

export default DashboardLayout;