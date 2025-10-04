// src/screens/Dormitorio.jsx

import React from 'react';
// IMPORTANTE: Este arquivo precisa ser criado na mesma pasta (screens/)
import './DetalheSetor.css'; 

export default function Dormitorio() {
  const statusAtual = "Normal";
  const temperatura = "20°C";
  const ocupacao = "12/18";
  // Simulação de alertas: Se esta lista estiver vazia, o status será "OK".
  const alertas = ["Vazamento detectado no Módulo Oeste (Nível 2)", "Filtro de ar com 85% de uso"];

  return (
    // Adicione a classe 'setor-detalhe' para aplicar os estilos de layout
    <div className="screen setor-detalhe">
      <h1 className="setor-titulo">🛌 Dormitório</h1>
      <p className="setor-descricao">Monitoramento e controle dos módulos de descanso.</p>

      {/* 1. SEÇÃO DE ALERTA E STATUS */}
      <section className={`painel-alerta ${alertas.length > 0 ? 'alerta-ativo' : 'alerta-normal'}`}>
        <h2>🔔 Status e Avisos</h2>
        {alertas.length > 0 ? (
          <div className="alerta-lista">
            <p className="alerta-urgente">⚠️ ALERTA DE PERIGO (Nível {alertas[0].includes('Nível 2') ? 'Alto' : 'Baixo'})</p>
            <ul>
              {alertas.map((alerta, index) => (
                <li key={index}>{alerta}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="status-ok">✅ Todos os Sistemas Operacionais</p>
        )}
      </section>

      {/* 2. SEÇÃO DE INFORMAÇÕES E CONTROLE */}
      <section className="painel-informacao">
        <h2>🛠️ Controle e Informações</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Temperatura Interna</h3>
            <p className="valor">{temperatura}</p>
          </div>
          <div className="info-card">
            <h3>Ocupação</h3>
            <p className="valor">{ocupacao}</p>
          </div>
          <div className="info-card">
            <h3>Pressão Atmosférica</h3>
            <p className="valor">1.02 atm</p>
          </div>
        </div>
        <button className="botao-controle">Ajustar Iluminação (Controle)</button>
      </section>

      {/* 3. SEÇÃO DE SUGESTÕES (Perímetro/Mudanças) */}
      <section className="painel-sugestao">
        <h2>💡 Sugestões de Mudança / Perímetro</h2>
        <p>Baseado nos alertas, o sistema sugere ações para otimizar o setor ou mitigar riscos de perímetro.</p>
        <ul className="sugestao-lista">
          <li>**Perímetro:** Sugerido o isolamento imediato do Módulo Oeste até o reparo do vazamento.</li>
          <li>**Manutenção:** Programar a troca do filtro de ar em 24h.</li>
          <li>**Otimização:** Reduzir a temperatura para $19^\circ\text{C}$ durante a noite para economizar energia.</li>
        </ul>
        <button className="botao-sugestao">Aceitar Sugestões de Manutenção</button>
      </section>
    </div>
  );
}