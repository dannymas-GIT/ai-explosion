import React from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Navigation />
      <Header />
      <main className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
