import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="navigation">
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">Main Dashboard</Link>
        </li>
        <li className="dropdown">
          <Link to="/sports" className="nav-link" onClick={() => toggleDropdown('sports')}>
            Sports
          </Link>
          {activeDropdown === 'sports' && (
            <ul className="dropdown-menu">
              <li><Link to="/sports">Sports Dashboard</Link></li>
              <li><Link to="/sports/football">Football</Link></li>
              <li><Link to="/sports/basketball">Basketball</Link></li>
              <li><Link to="/sports/tennis">Tennis</Link></li>
            </ul>
          )}
        </li>
        <li className="dropdown">
          <Link to="/finance" className="nav-link" onClick={() => toggleDropdown('finance')}>
            Finance
          </Link>
          {activeDropdown === 'finance' && (
            <ul className="dropdown-menu">
              <li><Link to="/finance">Finance Dashboard</Link></li>
              <li><Link to="/finance/stocks">Stocks</Link></li>
              <li><Link to="/finance/crypto">Cryptocurrency</Link></li>
              <li><Link to="/finance/forex">Forex</Link></li>
            </ul>
          )}
        </li>
        <li className="dropdown">
          <Link to="/weather-travel" className="nav-link" onClick={() => toggleDropdown('weather-travel')}>
            Weather & Travel
          </Link>
          {activeDropdown === 'weather-travel' && (
            <ul className="dropdown-menu">
              <li><Link to="/weather-travel">Weather & Travel Dashboard</Link></li>
              <li><Link to="/weather-travel/forecast">Weather Forecast</Link></li>
              <li><Link to="/weather-travel/destinations">Travel Destinations</Link></li>
            </ul>
          )}
        </li>
        <li className="dropdown">
          <Link to="/news" className="nav-link" onClick={() => toggleDropdown('news')}>
            News
          </Link>
          {activeDropdown === 'news' && (
            <ul className="dropdown-menu">
              <li><Link to="/news">News Dashboard</Link></li>
              <li><Link to="/news/technology">Technology</Link></li>
              <li><Link to="/news/business">Business</Link></li>
              <li><Link to="/news/science">Science</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
