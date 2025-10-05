import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h3>COLÔNIA AURORA</h3>
      </div>
      <ul>
        <li><NavLink to="/home">Centro de Comando</NavLink></li>
        <li><NavLink to="/dashboard">Painel de Locais</NavLink></li>
        <li><NavLink to="/observatorio">Observatório</NavLink></li>
        <li><NavLink to="/enfermaria">Enfermaria</NavLink></li>
        <li><NavLink to="/plantacao">Plantação</NavLink></li>
        <li><NavLink to="/dormitorio">Dormitórios</NavLink></li>
      </ul>
      <div className="sidebar-footer">
        <NavLink to="/">Logout</NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;
