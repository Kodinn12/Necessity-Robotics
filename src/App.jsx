// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Add other routes here */}
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;