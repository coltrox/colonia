import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  // Mantemos a lista 'setores' caso você volte ao Grid de Cards
  const setores = [
    { nome: "Laboratório", rota: "/laboratorio", emoji: "🔬" },
    { nome: "Observatório", rota: "/observatorio", emoji: "🛰️" },
    { nome: "Plantação", rota: "/plantacao", emoji: "🌱" },
    { nome: "Dispensa", rota: "/dispensa", emoji: "📦" },
    { nome: "Cozinha", rota: "/cozinha", emoji: "🍳" },
    { nome: "Refeitório", rota: "/refeitorio", emoji: "🍽️" },
    { nome: "Dormitórios", rota: "/dormitorio", emoji: "🛏️" },
    { nome: "Exercício Livre", rota: "/exercicio", emoji: "🏋️" },
    { nome: "Ambulatório", rota: "/ambulatorio", emoji: "🏥" },
    { nome: "Descarregamento", rota: "/descarregamento", emoji: "🚚" },
    { nome: "Energia", rota: "/energia", emoji: "⚡" },
    { nome: "Pesquisa", rota: "/pesquisa", emoji: "📚" },
  ];

  return (
    <div className="home">
      <h1>🏠 Central da Colônia</h1>
      <p>Controle todos os setores da sua base marciana.</p>

      {/* BOTÃO TEMPORÁRIO PARA O DORMITÓRIO */}
      <div className="area-acesso-rapido">
        <p>Acesso Rápido (Aguardando Mapa Interativo):</p>
        <Link to="./Dormitorio" className="botao-acesso-rapido">
            🛏️ Ir para Dormitórios
        </Link>
      </div>

      {/*
      O seu grid-setores original (que você removeu ou escondeu)
      <div className="grid-setores">
        {setores.map(...)
      </div>
      */}

    </div>
  );
}