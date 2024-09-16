import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MainDashboard from './components/MainDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <MainDashboard />
      </div>
    </Router>
  );
}

export default App;
