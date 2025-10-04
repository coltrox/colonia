import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Observatorio from "./screens/Observatorio";
import Enfermaria from "./screens/Enfermaria";
import Plantacao from "./screens/Plantacao";
import Dormitorio from "./screens/Dormitorio";
import Home from "./screens/Home"
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/">Central</Link></li>
            <li><Link to="/observatorio">🛰️ Observatório</Link></li>
            <li><Link to="/enfermaria">🏥 Enfermaria</Link></li>
            <li><Link to="/plantacao">🌱 Plantação</Link></li>
            <li><Link to="/dormitorio">🏠 Dormitório</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/observatorio" element={<Observatorio />} />
          <Route path="/enfermaria" element={<Enfermaria />} />
          <Route path="/plantacao" element={<Plantacao />} />
          <Route path="/dormitorio" element={<Dormitorio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
