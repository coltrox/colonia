import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Observatory.css';

const API_URL = 'http://localhost:3000/api';

const Observatory = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [systemTime, setSystemTime] = useState('');
  const [telescopeLogs, setTelescopeLogs] = useState(['> Primary array online. Target lock acquired.']);
  const [alerts, setAlerts] = useState([]);
  const [showAlarms, setShowAlarms] = useState(false);

  useEffect(() => {
  }, []);

  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        const [logsResponse, alertsResponse] = await Promise.all([
          axios.get(`${API_URL}/telescope-logs`),
          axios.get(`${API_URL}/alerts`)
        ]);
        setTelescopeLogs(logsResponse.data);
        setAlerts(alertsResponse.data.filter(a => a.location === 'Observatory'));
      } catch (error) {
        console.error("Error fetching data:", error);
        setTelescopeLogs(prev => ['> ERROR: ASTRO DATA FEED INTERRUPTED', ...prev.slice(0, 5)]);
      }
    };

    fetchSystemData();
    const dataInterval = setInterval(fetchSystemData, 7000);
    const timeInterval = setInterval(() => {
      const now = new Date();
      const stardate = now.toISOString().replace('T', ' ').split('.')[0] + ' Z';
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
      console.error("Error dismissing alert:", error);
    }
  };

  return (
    <div className="screen-container">
      <canvas ref={canvasRef} className="starfield-canvas"></canvas>
      <div className="scanlines"></div>

      <div className="hud-grid">
        <header className="hud-header">
          <h1>OBSERVATORY MODULE</h1>
          <div className="header-right">
            <p className="system-time">{systemTime}</p>
            {/* NOTIFICATION ICON */}
            <div className="notifications-bell" onClick={() => setShowAlarms(!showAlarms)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M18 16.5V11C18 7.13 14.87 4 11 4S4 7.13 4 11v5.5L2 19h18l-2-2.5zM11 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path>
              </svg>
              {alerts.length > 0 && <span className="alarm-badge">{alerts.length}</span>}
              {showAlarms && (
                <div className="alarms-dropdown">
                  <h3>Observatory Alerts</h3>
                  {alerts.length > 0 ? alerts.map(alert => (
                    <div key={alert.id} className="alarm-item">
                      <strong>{alert.locationName}</strong>
                      <p>Anomaly: {alert.anomaly}</p>
                      <small>RA/Dec: {alert.coords}</small>
                      <button className="resolve-button" onClick={() => handleResolveAlert(alert.id)}>
                        Dismiss
                      </button>
                    </div>
                  )) : <p className="no-alerts">Sky clear of critical events.</p>}
                </div>
              )}
            </div>
          </div>
        </header>

        <aside className="hud-left-panel">
          <div className="panel">
            <h3>TELESCOPE STATUS</h3>
            <p>Antenna Array: <span>ONLINE</span></p>
            <p>Coolant Temp: <span>-200°C</span></p>
            <p>Dome Position: <span>AZ 45° EL 90°</span></p>
          </div>
          <div className="panel">
            <h3>CURRENT TARGET</h3>
            <p>Object: <span>Proxima Centauri</span></p>
            <p>Exposure Time: <span>600s</span></p>
          </div>
        </aside>

        <main className="hud-main">
          <div className="main-viz-container">
            <h2 className="observatory-viz-title">SPECTROSCOPIC DISPLAY</h2>
          </div>
          <p className="observatory-status">DATA INGESTION RATE: <span className="status-ok">NORMAL</span></p>
          <button className="main-action-button" onClick={() => navigate('/data-archive')}>Access Data Archive</button>
        </main>

        <aside className="hud-right-panel">
          <div className="panel terminal">
            <h3>ASTROPHYSICS LOGS</h3>
            <div className="log-entries">
              {telescopeLogs.map((log, index) => (
                <p key={index} className="log-entry">{log}</p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Observatory;
