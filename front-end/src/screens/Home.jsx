import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const THREE = window.THREE;
const API_URL = 'http://localhost:3000/api';

const Home = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const globeRef = useRef(null);
  const [systemTime, setSystemTime] = useState('');
  const [systemLogs, setSystemLogs] = useState(['> Aguardando conexão...']);
  const [alerts, setAlerts] = useState([]);
  const [showAlarms, setShowAlarms] = useState(false);

  useEffect(() => {
    // ... (o seu código do canvas e do globo 3D pode ser colado aqui)
  }, []);
  
  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        const [logsResponse, alertsResponse] = await Promise.all([
          axios.get(`${API_URL}/system-logs`),
          axios.get(`${API_URL}/alerts`)
        ]);
        setSystemLogs(logsResponse.data);
        setAlerts(alertsResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setSystemLogs(prev => ['> ERRO DE CONEXÃO', ...prev.slice(0, 5)]);
      }
    };
    fetchSystemData();
    const dataInterval = setInterval(fetchSystemData, 7000);
    const timeInterval = setInterval(() => {
      const now = new Date();
      const stardate = now.toISOString().replace('T', ' T ').split('.')[0] + ' Z';
      setSystemTime(stardate);
    }, 1000);
    return () => {
      clearInterval(dataInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const handleResolveAlert = async (alertId) => {
    try {
      await axios.post(`${API_URL}/alerts/${alertId}/resolve`);
      setAlerts(prevAlerts => prevAlerts.filter(a => a.id !== alertId));
    } catch (error) {
      console.error("Erro ao dispensar alerta:", error);
    }
  };

  return (
    <div className="home-container">
        <canvas ref={canvasRef} className="starfield-canvas"></canvas>
        <div className="scanlines"></div>
        <div className="hud-grid">
            <header className="hud-header">
                <h1>CENTRO DE COMANDO</h1>
                <div className="header-right">
                    <p className="system-time">{systemTime}</p>
                    <div className="notifications-bell" onClick={() => setShowAlarms(!showAlarms)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 16.5V11C18 7.13 14.87 4 11 4S4 7.13 4 11v5.5L2 19h18l-2-2.5zM11 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path></svg>
                        {alerts.length > 0 && <span className="alarm-badge">{alerts.length}</span>}
                        {showAlarms && (
                            <div className="alarms-dropdown">
                                <h3>Alertas de Ambiente</h3>
                                {alerts.length > 0 ? alerts.map(alert => (
                                    <div key={alert.id} className="alarm-item">
                                        <strong>{alert.localName}</strong>
                                        <p>{`Temp: ${alert.currentTemp}°C`}</p>
                                        <small>{`(Seguro: ${alert.minTemp}°C-${alert.maxTemp}°C)`}</small>
                                        <button className="resolve-button" onClick={() => handleResolveAlert(alert.id)}>Dispensar</button>
                                    </div>
                                )) : <p className="no-alerts">Nenhum alerta ativo.</p>}
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <aside className="hud-left-panel">
                <div className="panel"><h3>STATUS</h3><p>SUPORTE DE VIDA: <span className="status-ok">ESTÁVEL</span></p><p>ENERGIA: <span className="status-ok">ONLINE</span></p></div>
                <div className="panel"><h3>DADOS</h3><p>POPULAÇÃO: <span>20</span></p><p>LOCALIZAÇÃO: <span>Marte</span></p></div>
            </aside>
            <main className="hud-main">
                <div ref={globeRef} className="globe-container"></div>
                <h2>NÚCLEO HOLOGRÁFICO</h2>
                <button className="nav-button" onClick={() => navigate('/dashboard')}>Aceder ao Painel</button>
            </main>
            <aside className="hud-right-panel">
                <div className="panel terminal"><h3>LOGS DO SISTEMA</h3><div className="log-entries">{systemLogs.map((log, index) => (<p key={index} className="log-entry">{log}</p>))}</div></div>
            </aside>
        </div>
    </div>
  );
};

export default Home;