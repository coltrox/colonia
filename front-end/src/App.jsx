import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Componentes que você já tem
import Observatorio from "./screens/Observatorio";
import Enfermaria from "./screens/Enfermaria"; // Vamos usar este para Ambulatório
import Plantacao from "./screens/Plantacao";
import Dormitorio from "./screens/Dormitorio";
import Home from "./screens/Home";
// Novos Placeholders
import PlaceholderScreen from "./screens/PlaceholderScreen"; // Componente genérico
import "./App.css";

// Componente genérico para rotas ainda não criadas
const Laboratorio = () => <PlaceholderScreen title="Laboratório" />;
const Refeitorio = () => <PlaceholderScreen title="Refeitório" />;
const Cozinha = () => <PlaceholderScreen title="Cozinha" />;
const Dispensa = () => <PlaceholderScreen title="Dispensa" />;
const Exercicio = () => <PlaceholderScreen title="Exercício Livre" />;
const Descarregamento = () => <PlaceholderScreen title="Descarregamento" />;
const Energia = () => <PlaceholderScreen title="Energia/Fotovoltaica" />;
const Pesquisa = () => <PlaceholderScreen title="Pesquisa/Desenvolvimento" />;


function App() {
  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Rotas já existentes */}
            <Route path="/observatorio" element={<Observatorio />} />
            <Route path="/plantacao" element={<Plantacao />} />
            <Route path="/dormitorio" element={<Dormitorio />} />
            <Route path="/ambulatorio" element={<Enfermaria />} /> {/* Usando Enfermaria para Ambulatório */}

            {/* Rotas Placeholder */}
            <Route path="/laboratorio" element={<Laboratorio />} />
            <Route path="/refeitorio" element={<Refeitorio />} />
            <Route path="/cozinha" element={<Cozinha />} />
            <Route path="/dispensa" element={<Dispensa />} />
            <Route path="/exercicio" element={<Exercicio />} />
            <Route path="/descarregamento" element={<Descarregamento />} />
            <Route path="/energia" element={<Energia />} />
            <Route path="/pesquisa" element={<Pesquisa />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;