import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import StainedGlassLogo from '../assets/StainedGlassLogo.png';

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-left">
          <img src={StainedGlassLogo} alt="AI-Explosion LifeBoard Logo" className="header-logo" />
          <Link to="/" className="header-title">AI-Explosion LifeBoard</Link>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
