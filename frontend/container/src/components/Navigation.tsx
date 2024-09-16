import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [showSportsDropdown, setShowSportsDropdown] = useState(false);
  const [showFinanceDropdown, setShowFinanceDropdown] = useState(false);

  return (
    <nav className="top-navigation">
      <ul>
        <li 
          onMouseEnter={() => setShowSportsDropdown(true)}
          onMouseLeave={() => setShowSportsDropdown(false)}
        >
          <Link to="/sports">Sports</Link>
          {showSportsDropdown && (
            <ul className="dropdown">
              <li><Link to="/sports">Dashboard</Link></li>
              <li><Link to="/sports/nfl">NFL</Link></li>
              <li><Link to="/sports/handball">Handball</Link></li>
            </ul>
          )}
        </li>
        <li 
          onMouseEnter={() => setShowFinanceDropdown(true)}
          onMouseLeave={() => setShowFinanceDropdown(false)}
        >
          <Link to="/finance">Finance</Link>
          {showFinanceDropdown && (
            <ul className="dropdown">
              <li><Link to="/finance/stock-monitor">Stock Monitor</Link></li>
              <li><Link to="/finance/tool1">Finance Tool 1</Link></li>
              <li><Link to="/finance/tool2">Finance Tool 2</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/weather-travel">Weather & Travel</Link></li>
        <li><Link to="/news">News</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
