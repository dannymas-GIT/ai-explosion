import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainDashboard from './components/MainDashboard';
import SportsDashboard from './components/Sports/SportsDashboard';
import FinanceDashboard from './components/Finance/FinanceDashboard';
import WeatherTravelDashboard from './components/WeatherTravel/WeatherTravelDashboard';
import NewsDashboard from './components/News/NewsDashboard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/sports/*" element={<SportsDashboard />} />
      <Route path="/finance/*" element={<FinanceDashboard />} />
      <Route path="/weather-travel/*" element={<WeatherTravelDashboard />} />
      <Route path="/news/*" element={<NewsDashboard />} />
    </Routes>
  );
};

export default AppRoutes;