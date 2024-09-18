import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MainDashboard from './components/MainDashboard';
import SportsDashboard from './components/Sports/SportsDashboard';
import FinanceDashboard from './components/Finance/FinanceDashboard';
import WeatherTravelDashboard from './components/WeatherTravel/WeatherTravelDashboard';
import NewsDashboard from './components/News/NewsDashboard';

const App: React.FC = () => (
  <Router>
    <div className="app-wrapper">
      <div className="content-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/sports" element={<SportsDashboard />} />
            <Route path="/finance" element={<FinanceDashboard />} />
            <Route path="/weather-travel" element={<WeatherTravelDashboard />} />
            <Route path="/news" element={<NewsDashboard />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;
