import React, { ReactNode } from 'react';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
