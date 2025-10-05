import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginScreen.css";

export default function LoginScreen() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [stayLogged, setStayLogged] = useState(false);
  const navigate = useNavigate();

  // ✅ Redireciona automaticamente se já estiver logado
  useEffect(() => {
    const logado = localStorage.getItem("logado");
    if (logado === "true") {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (login === "admin" && senha === "1234") {
      if (stayLogged) {
        localStorage.setItem("logado", "true");
        localStorage.setItem("lastRoute", "/home");
      } else {
        localStorage.removeItem("logado");
        localStorage.removeItem("lastRoute");
      }
      navigate("/home");
    } else {
      alert("Login ou senha incorretos!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">🛠️ Sistema Colônia</h1>
        <p className="login-subtitle">Acesso restrito a engenheiros autorizados</p>

        <input
          type="text"
          placeholder="Usuário"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="login-input"
        />

        <div className="remember-container">
          <label className="remember-text">Manter conectado</label>
          <input
            type="checkbox"
            checked={stayLogged}
            onChange={() => setStayLogged(!stayLogged)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}
