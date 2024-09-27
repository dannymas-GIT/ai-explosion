import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import MainDashboard from './components/MainDashboard';
import SportsDashboard from './components/Sports/SportsDashboard';
import FinanceDashboard from './components/Finance/FinanceDashboard';
import WeatherTravelDashboard from './components/WeatherTravel/WeatherTravelDashboard';
import NewsDashboard from './components/News/NewsDashboard';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/sports" element={<SportsDashboard />} />
            <Route path="/finance" element={<FinanceDashboard />} />
            <Route path="/weather-travel" element={<WeatherTravelDashboard />} />
            <Route path="/news" element={<NewsDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
