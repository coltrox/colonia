import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const API_URL = 'http://localhost:3000/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [locais, setLocais] = useState([]);
  const [novoLocal, setNovoLocal] = useState({ 
    nome: '', 
    descricao: '', 
    temperaturaMinima: '19', 
    temperaturaMaxima: '23' 
  });
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    buscarLocais();
  }, []);

  const buscarLocais = async () => {
    try {
      const resposta = await axios.get(`${API_URL}/locais`);
      setLocais(resposta.data);
    } catch (error) {
      console.error('Erro ao buscar locais:', error);
      setMensagem('Falha ao carregar locais. O servidor back-end está a correr?');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoLocal({ ...novoLocal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!novoLocal.nome) {
      setMensagem('O nome do local é obrigatório.');
      return;
    }
    try {
      // Envia os dados convertidos para número
      await axios.post(`${API_URL}/locais`, {
        ...novoLocal,
        temperaturaMinima: parseFloat(novoLocal.temperaturaMinima),
        temperaturaMaxima: parseFloat(novoLocal.temperaturaMaxima)
      });
      setMensagem(`Local "${novoLocal.nome}" criado com sucesso!`);
      // Limpa o formulário
      setNovoLocal({ nome: '', descricao: '', temperaturaMinima: '19', temperaturaMaxima: '23' });
      buscarLocais(); // Atualiza a lista
    } catch (error)      {
      console.error('Erro ao criar local:', error);
      setMensagem('Erro ao criar o local. Tente novamente.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Painel de Monitoramento de Locais</h1>
        <button className="back-button" onClick={() => navigate('/home')}>
          &larr; Voltar ao Centro de Comando
        </button>
      </div>
      
      <div className="card">
        <h2>Adicionar Novo Local de Habitação</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            value={novoLocal.nome}
            onChange={handleInputChange}
            placeholder="Nome do Local (ex: Alojamento Alpha)"
          />
          <input
            type="text"
            name="descricao"
            value={novoLocal.descricao}
            onChange={handleInputChange}
            placeholder="Descrição (opcional)"
          />
          <input
            type="number"
            name="temperaturaMinima"
            value={novoLocal.temperaturaMinima}
            onChange={handleInputChange}
            placeholder="Temp. Mínima Segura (°C)"
          />
          <input
            type="number"
            name="temperaturaMaxima"
            value={novoLocal.temperaturaMaxima}
            onChange={handleInputChange}
            placeholder="Temp. Máxima Segura (°C)"
          />
          <button type="submit">Adicionar Local</button>
        </form>
        {mensagem && <p style={{textAlign: 'center', marginTop: '15px'}}>{mensagem}</p>}
      </div>

      <div className="card">
        <h2>Locais Cadastrados</h2>
        {locais.length > 0 ? (
          <ul>
            {locais.map((local) => (
              <li key={local.id}>
                <strong>{local.nome}</strong>
                {local.descricao && <p>{local.descricao}</p>}
                <p><small>Faixa Segura: {local.temperaturaMinima}°C a {local.temperaturaMaxima}°C</small></p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum local cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;