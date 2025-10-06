import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EnergyRoom.css';

const API_URL = 'http://localhost:3000/api';

const EnergyRoom = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [systemTime, setSystemTime] = useState('');
  const [powerLogs, setPowerLogs] = useState(['> Core temperature nominal.']);
  const [alerts, setAlerts] = useState([]);
  const [showAlarms, setShowAlarms] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        const [logsResponse, alertsResponse] = await Promise.all([
          axios.get(`${API_URL}/power-logs`),
          axios.get(`${API_URL}/alerts`)
        ]);
        setPowerLogs(logsResponse.data);
        setAlerts(alertsResponse.data.filter(a => a.location === 'EnergyRoom'));
      } catch (error) {
        console.error("Error fetching data:", error);
        setPowerLogs(prev => ['> ERROR: POWER FEED DISCONNECTED', ...prev.slice(0, 5)]);
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
          <h1>ENERGY CORE CONTROL</h1>
          <div className="header-right">
            <p className="system-time">{systemTime}</p>
            <div className="notifications-bell" onClick={() => setShowAlarms(!showAlarms)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M18 16.5V11C18 7.13 14.87 4 11 4S4 7.13 4 11v5.5L2 19h18l-2-2.5zM11 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path>
              </svg>
              {alerts.length > 0 && <span className="alarm-badge">{alerts.length}</span>}
              {showAlarms && (
                <div className="alarms-dropdown">
                  <h3>Energy Alerts</h3>
                  {alerts.length > 0 ? alerts.map(alert => (
                    <div key={alert.id} className="alarm-item">
                      <strong>{alert.locationName}</strong>
                      <p>Issue: {alert.issueType}</p>
                      <small>Severity: {alert.severity}</small>
                      <button className="resolve-button" onClick={() => handleResolveAlert(alert.id)}>
                        Dismiss
                      </button>
                    </div>
                  )) : <p className="no-alerts">No critical issues.</p>}
                </div>
              )}
            </div>
          </div>
        </header>

        <aside className="hud-left-panel">
          <div className="panel">
            <h3>REACTOR STATUS</h3>
            <p>Fusion Rate: <span>99.8%</span></p>
            <p>Shield Integrity: <span>95%</span></p>
            <p>Heat Sink: <span className="status-warn">OVER TEMP (450°C)</span></p>
          </div>
          <div className="panel">
            <h3>OUTPUT METRICS</h3>
            <p>Current Load: <span>750 MW</span></p>
            <p>Storage Banks: <span>85%</span></p>
          </div>
        </aside>

        <main className="hud-main">
          <div className="main-viz-container">
            {/* Placeholder for Core Visualization */}
            <h2 className="core-viz-title">CORE THERMAL DENSITY</h2>
          </div>
          <p className="core-status"><span className="status-warn">STANDBY MODE ACTIVATED</span></p>
          <button className="main-action-button" onClick={() => navigate('/monitor')}>Emergency Power Management</button>
        </main>

        <aside className="hud-right-panel">
          <div className="panel terminal">
            <h3>ERROR LOGS</h3>
            <div className="log-entries">
              {powerLogs.map((log, index) => (
                <p key={index} className="log-entry">{log}</p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EnergyRoom;
