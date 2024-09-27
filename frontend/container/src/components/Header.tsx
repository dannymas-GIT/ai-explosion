import React from 'react';
// Remove this line if not needed
// import { Link } from 'react-router-dom';
import './Header.css';
import StainedGlassLogo from '../assets/StainedGlassLogo.png';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-title-container">
          <img src={StainedGlassLogo} alt="AI-Explosion LifeBoard Logo" className="logo" />
          <h1 className="app-title">AI-Explosion LifeBoard</h1>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
