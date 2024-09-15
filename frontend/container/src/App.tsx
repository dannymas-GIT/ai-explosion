import React, { lazy, Suspense } from 'react';
import './App.css';

const Header = lazy(() => import('./components/Header'));
const AIAdoptionChart = lazy(() => import('./components/AIAdoptionChart'));
const AIImpactTable = lazy(() => import('./components/AIImpactTable'));
const AIUseCasesPieChart = lazy(() => import('./components/AIUseCasesPieChart'));
const AIJobsLineGraph = lazy(() => import('./components/AIJobsLineGraph'));
const SearchComponent = lazy(() => import('./components/SearchComponent.tsx'));
const Footer = lazy(() => import('./components/Footer'));

const App: React.FC = () => (
  <div className="dashboard">
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
    </Suspense>
    <main className="dashboard-grid">
      <div className="dashboard-column left-column">
        <section className="dashboard-cell">
          <h2>AI Adoption Trends</h2>
          <Suspense fallback={<div>Loading chart...</div>}>
            <AIAdoptionChart />
          </Suspense>
        </section>
        <section className="dashboard-cell">
          <h2>AI Impact</h2>
          <Suspense fallback={<div>Loading metrics...</div>}>
            <AIImpactTable />
          </Suspense>
        </section>
      </div>
      <div className="dashboard-column center-column">
        <section className="dashboard-cell search-cell">
          <h2>AI-Powered Search</h2>
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchComponent />
          </Suspense>
        </section>
      </div>
      <div className="dashboard-column right-column">
        <section className="dashboard-cell">
          <h2>AI Use Cases</h2>
          <Suspense fallback={<div>Loading chart...</div>}>
            <AIUseCasesPieChart />
          </Suspense>
        </section>
        <section className="dashboard-cell">
          <h2>AI-Related Job Trends</h2>
          <Suspense fallback={<div>Loading graph...</div>}>
            <AIJobsLineGraph />
          </Suspense>
        </section>
      </div>
    </main>
    <Suspense fallback={<div>Loading...</div>}>
      <Footer />
    </Suspense>
  </div>
);

export default App;
