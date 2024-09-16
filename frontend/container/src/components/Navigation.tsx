import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/sports">Sports</Link></li>
        <li><Link to="/finance">Finance</Link></li>
        <li><Link to="/weather-travel">Weather & Travel</Link></li>
        <li><Link to="/news">News</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
