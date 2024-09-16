import React from 'react';
import Navigation from './Navigation';
import MainDashboard from './MainDashboard';

const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <Navigation />
      <MainDashboard />
    </div>
  );
};

export default Layout;
