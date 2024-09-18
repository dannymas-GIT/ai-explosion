import React from 'react';
import './Header.css';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <img 
          src="/images/StainedGlassLogo250.png" 
          alt="AI-Explosion LifeBoard Logo" 
          className="header-logo" 
          width="150" 
          height="150"
        />
        <h1>AI-Explosion LifeBoard</h1>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
