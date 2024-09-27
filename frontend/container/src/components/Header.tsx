import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/sports">Sports</Link></li>
          <li>
            <span>Finance</span>
            <ul>
              <li><Link to="/finance">Overview</Link></li>
              <li><Link to="/finance/stocks">Stock Monitor</Link></li>
              <li><Link to="/finance/account">Account Management</Link></li>
            </ul>
          </li>
          <li><Link to="/weather-travel">Weather & Travel</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
