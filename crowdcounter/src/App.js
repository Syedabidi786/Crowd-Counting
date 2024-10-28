import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Locations from '../src/pages/Locations';
import Reports from '../src/pages/Reports';
import Settings from '../src/pages/Settings';
import SideNavBar from '../src/components/SideNavBar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Sidebar remains consistent across all pages */}
        <SideNavBar />

        {/* Main content changes based on route */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;