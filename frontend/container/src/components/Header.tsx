import React from 'react';
import Navigation from './Navigation';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>AI-Explosion LifeBoard</h1>
      <Navigation />
    </header>
  );
};

export default Header;
