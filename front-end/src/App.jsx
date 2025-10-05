import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import Home from './screens/Home.jsx';
import Dashboard from './screens/Dashboard.jsx';
import Observatorio from './screens/Observatorio.jsx';
import Enfermaria from './screens/Enfermaria.jsx';
import Plantacao from './screens/Plantacao.jsx';
import Dormitorio from './screens/Dormitorio.jsx';
import './App.css'; // Importa os estilos que definem o layout

// Componente de Layout para as páginas que têm o menu lateral
const MainLayout = () => (
  // É este DIV com a classe "app-layout" que organiza a tela
  <div className="app-layout">
    <Sidebar />
    <main className="content">
      <Outlet /> {/* As rotas filhas (Home, Dashboard, etc.) serão renderizadas aqui */}
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* A Rota de Login não tem o menu lateral */}
        <Route path="/" element={<LoginScreen />} />

        {/* Rotas que fazem parte do layout principal (com menu) */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/observatorio" element={<Observatorio />} />
          <Route path="/enfermaria" element={<Enfermaria />} />
          <Route path="/plantacao" element={<Plantacao />} />
          <Route path="/dormitorio" element={<Dormitorio />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;