import React, { lazy, Suspense } from 'react';

const AIAdoptionChart = lazy(() => import('./AIAdoptionChart'));
const AIImpactTable = lazy(() => import('./AIImpactTable'));
const AIUseCasesPieChart = lazy(() => import('./AIUseCasesPieChart'));
const AIJobsLineGraph = lazy(() => import('./AIJobsLineGraph'));
const SearchComponent = lazy(() => import('./SearchComponent'));
const AIInvestmentBarChart = lazy(() => import('./AIInvestmentBarChart'));
const AITrendsForecastChart = lazy(() => import('./AITrendsForecastChart'));

const Dashboard: React.FC = () => (
  <div className="dashboard">
    <main className="dashboard-grid">
      <div className="dashboard-column left-column">
        <section className="dashboard-cell">
          <h2>AI Adoption Trends</h2>
          <Suspense fallback={<div>Loading chart...</div>}>
            <AIAdoptionChart />
          </Suspense>
        </section>
        <section className="dashboard-cell">
          <h2>AI Investment Trends</h2>
          <Suspense fallback={<div>Loading chart...</div>}>
            <AIInvestmentBarChart />
          </Suspense>
        </section>
        <section className="dashboard-cell">
          <h2>AI Use Cases</h2>
          <Suspense fallback={<div>Loading chart...</div>}>
            <AIUseCasesPieChart />
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
          <h2>AI-Related Job Trends</h2>
          <Suspense fallback={<div>Loading graph...</div>}>
            <AIJobsLineGraph />
          </Suspense>
        </section>
        <section className="dashboard-cell">
          <h2>AI Trends Forecast</h2>
          <Suspense fallback={<div>Loading chart...</div>}>
            <AITrendsForecastChart />
          </Suspense>
        </section>
        <section className="dashboard-cell">
          <h2>AI Impact</h2>
          <Suspense fallback={<div>Loading metrics...</div>}>
            <AIImpactTable />
          </Suspense>
        </section>
      </div>
    </main>
  </div>
);

export default Dashboard;
