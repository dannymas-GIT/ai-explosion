import React from 'react';
import LiveKitVoiceAssistant from './LiveKit/LiveKitVoiceAssistant';
import SearchComponent from './Search/SearchComponent';
// Import other necessary components

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      {/* Other dashboard components */}
      <div className="middle-column">
        <LiveKitVoiceAssistant />
        <SearchComponent />
        {/* Other middle column components */}
      </div>
      {/* Other dashboard components */}
    </div>
  );
};

export default Dashboard;