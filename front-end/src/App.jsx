import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar.jsx';
import './App.css'; 

import LoginScreen from './screens/LoginScreen.jsx';
import Home from './screens/Home.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Plantacao from './screens/Plantation.jsx';
import SupplyPanel from './screens/SupplyPanel.jsx';
import StoragePanel from './screens/StoragePanel.jsx';
import EnergyRoom from './screens/EnergyRoom.jsx';
import Infirmary from './screens/Infirmary.jsx';
import FreeRoom from './screens/FreeRoom.jsx';
import Observatory from './screens/Observatory.jsx';
import GymRoom from './screens/GymRoom.jsx';

const useAuth = () => {
  return localStorage.getItem("loggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true";
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {isSidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="main-content">
        <button className="hamburger-button" onClick={() => setSidebarOpen(true)}>
          <HamburgerIcon />
        </button>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plantation" element={<Plantacao />} />
            <Route path="/supplies" element={<SupplyPanel />} />
            <Route path="/storage" element={<StoragePanel />} />
            <Route path="/energyroom" element={<EnergyRoom />} />
            <Route path="/infirmary" element={<Infirmary />} />
            <Route path="/freeroom" element={<FreeRoom />} />
            <Route path="/observatory" element={<Observatory />} />
            <Route path="/gymroom" element={<GymRoom />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;