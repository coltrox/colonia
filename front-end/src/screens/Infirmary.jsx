import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Infirmary.css';

const API_URL = 'http://localhost:3000/api';

const Infirmary = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [systemTime, setSystemTime] = useState('');
  const [medLogs, setMedLogs] = useState(['> Medical drone 01 docked. Automated assessment complete.']);
  const [alerts, setAlerts] = useState([]);
  const [showAlarms, setShowAlarms] = useState(false);

  useEffect(() => {
  }, []);

  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        const [logsResponse, alertsResponse] = await Promise.all([
          axios.get(`${API_URL}/medical-logs`),
          axios.get(`${API_URL}/alerts`)
        ]);
        setMedLogs(logsResponse.data);
        setAlerts(alertsResponse.data.filter(a => a.location === 'Infirmary'));
      } catch (error) {
        console.error("Error fetching data:", error);
        setMedLogs(prev => ['> ERROR: LIFE SIGNS MONITOR OFFLINE', ...prev.slice(0, 5)]);
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
          <h1>INFIRMARY - MEDICAL MODULE</h1>
          <div className="header-right">
            <p className="system-time">{systemTime}</p>
            <div className="notifications-bell" onClick={() => setShowAlarms(!showAlarms)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M18 16.5V11C18 7.13 14.87 4 11 4S4 7.13 4 11v5.5L2 19h18l-2-2.5zM11 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path>
              </svg>
              {alerts.length > 0 && <span className="alarm-badge">{alerts.length}</span>}
              {showAlarms && (
                <div className="alarms-dropdown">
                  <h3>Medical Alerts</h3>
                  {alerts.length > 0 ? alerts.map(alert => (
                    <div key={alert.id} className="alarm-item">
                      <strong>{alert.patientID}</strong>
                      <p>Condition: {alert.condition}</p>
                      <small>Severity: {alert.level}</small>
                      <button className="resolve-button" onClick={() => handleResolveAlert(alert.id)}>
                        Acknowledge
                      </button>
                    </div>
                  )) : <p className="no-alerts">No active emergencies.</p>}
                </div>
              )}
            </div>
          </div>
        </header>

        <aside className="hud-left-panel">
          <div className="panel">
            <h3>PATIENT STATUS</h3>
            <p>Beds Occupied: <span>1/4</span></p>
            <p>Isolation: <span>OFFLINE</span></p>
            <p>Vitals Monitor: <span className="status-ok">OPERATIONAL</span></p>
          </div>
          <div className="panel">
            <h3>SUPPLY LEVELS</h3>
            <p>Painkillers: <span>98 doses</span></p>
            <p>Antivirals: <span className="status-warn">LOW STOCK (10 units)</span></p>
          </div>
        </aside>

        <main className="hud-main">
          <div className="main-viz-container">
            <h2 className="med-viz-title">LIFE SIGNS MONITOR</h2>
          </div>
          <p className="med-status">CRITICAL CARE MODE: <span className="status-crit">INACTIVE</span></p>
          <button className="main-action-button" onClick={() => navigate('/patient-records')}>Access Patient Records</button>
        </main>

        <aside className="hud-right-panel">
          <div className="panel terminal">
            <h3>MEDICAL LOGS</h3>
            <div className="log-entries">
              {medLogs.map((log, index) => (
                <p key={index} className="log-entry">{log}</p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Infirmary;
