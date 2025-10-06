import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GymRoom.css';

const API_URL = 'http://localhost:3000/api';

const GymRoom = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [systemTime, setSystemTime] = useState('');
  const [gymLogs, setGymLogs] = useState(['> Environment controls nominal. Ready for workout.']);
  const [alerts, setAlerts] = useState([]);
  const [showAlarms, setShowAlarms] = useState(false);

  // NOTE: This useEffect should contain canvas initialization logic (starfield)
  useEffect(() => {}, []);

  useEffect(() => {
    const fetchSystemData = async () => {
      try {
        const [logsResponse, alertsResponse] = await Promise.all([
          axios.get(`${API_URL}/gym-logs`),
          axios.get(`${API_URL}/alerts`)
        ]);
        setGymLogs(logsResponse.data);
        setAlerts(alertsResponse.data.filter(a => a.location === 'GymRoom'));
      } catch (error) {
        console.error("Error fetching data:", error);
        setGymLogs(prev => ['> ERROR: EQUIPMENT SENSOR FAILURE', ...prev.slice(0, 5)]);
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
          <h1>GYM ROOM - FITNESS MODULE</h1>
          <div className="header-right">
            <p className="system-time">{systemTime}</p>
            {/* NOTIFICATION ICON - EXACTLY LIKE HOME */}
            <div className="notifications-bell" onClick={() => setShowAlarms(!showAlarms)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M18 16.5V11C18 7.13 14.87 4 11 4S4 7.13 4 11v5.5L2 19h18l-2-2.5zM11 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path>
              </svg>
              {alerts.length > 0 && <span className="alarm-badge">{alerts.length}</span>}
              {showAlarms && (
                <div className="alarms-dropdown">
                  <h3>Equipment Alerts</h3>
                  {alerts.length > 0 ? alerts.map(alert => (
                    <div key={alert.id} className="alarm-item">
                      <strong>{alert.equipmentID}</strong>
                      <p>Failure: {alert.fault}</p>
                      <small>Priority: {alert.priority}</small>
                      <button className="resolve-button" onClick={() => handleResolveAlert(alert.id)}>
                        Acknowledge
                      </button>
                    </div>
                  )) : <p className="no-alerts">All equipment online.</p>}
                </div>
              )}
            </div>
          </div>
        </header>

        <aside className="hud-left-panel">
          <div className="panel">
            <h3>FITNESS STATS</h3>
            <p>Avg Heart Rate: <span>110 BPM</span></p>
            <p>Training Load: <span>65%</span></p>
            <p>Atmosphere: <span className="status-ok">OPTIMAL</span></p>
          </div>
          <div className="panel">
            <h3>EQUIPMENT</h3>
            <p>Treadmill 1: <span className="status-ok">ACTIVE</span></p>
            <p>Rower 2: <span className="status-warn">STANDBY</span></p>
          </div>
        </aside>

        <main className="hud-main">
          <div className="main-viz-container">
            {/* Placeholder for Biometric Monitor / Activity Tracker */}
            <h2 className="gym-viz-title">CREW VITAL MONITOR</h2>
          </div>
          <p className="gym-status">CURRENT ACTIVITY: <span className="status-warn">HIGH INTENSITY</span></p>
          <button className="main-action-button" onClick={() => navigate('/fitness-goals')}>View Fitness Goals</button>
        </main>

        <aside className="hud-right-panel">
          <div className="panel terminal">
            <h3>USAGE LOGS</h3>
            <div className="log-entries">
              {gymLogs.map((log, index) => (
                <p key={index} className="log-entry">{log}</p>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default GymRoom;
