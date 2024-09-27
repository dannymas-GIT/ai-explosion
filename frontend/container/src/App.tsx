import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AppRoutes from './AppRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
