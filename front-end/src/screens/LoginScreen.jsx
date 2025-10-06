import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginScreen.css";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stayLogged, setStayLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se já existe um login (seja em localStorage ou sessionStorage)
    const loggedIn = localStorage.getItem("loggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true";
    if (loggedIn) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      if (stayLogged) {
        // Se "manter logado" estiver marcado, usa localStorage (persistente)
        localStorage.setItem("loggedIn", "true");
      } else {
        // Se NÃO estiver marcado, usa sessionStorage (só para a sessão atual)
        sessionStorage.setItem("loggedIn", "true");
      }
      navigate("/home");
    } else {
      alert("Incorrect username or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">🛠️ Colony System</h1>
        <p className="login-subtitle">Restricted access for authorized engineers</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <div className="remember-container">
          <label className="remember-text">Stay logged in</label>
          <input
            type="checkbox"
            checked={stayLogged}
            onChange={() => setStayLogged(!stayLogged)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}