import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SportsOverview from './SportsOverview';
import NFL from './NFL';
import Handball from './Handball';

const SportsDashboard: React.FC = () => (
   
  <div className="sports-dashboard">
    <h1>Sports Dashboard</h1>
    <Routes>
      <Route path="/" element={<SportsOverview />} />
      <Route path="/nfl" element={<NFL />} />
      <Route path="/handball" element={<Handball />} />
    </Routes>
    <p>This is the placeholder for Sports Dashboard. You can add your specific sports related features here.</p>
      {/* Add your finance tool components here */}
  </div>
);

export default SportsDashboard;
