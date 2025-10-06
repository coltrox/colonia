import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StatusMonitor.css';

const API_URL = 'http://localhost:3000/api';

const StatusMonitor = () => {
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModules = async () => {
            if (isLoading) { 
                try {
                    const response = await axios.get(`${API_URL}/modules`);
                    setModules(response.data);
                    setError(null);
                } catch (err) {
                    console.error("Error fetching module statuses:", err);
                    setError("Failed to fetch module statuses. Is the back-end running?");
                } finally {
                    setIsLoading(false);
                }
            } else { // Atualizações em segundo plano
                try {
                    const response = await axios.get(`${API_URL}/modules`);
                    setModules(response.data);
                } catch (err) {
                    console.error("Background fetch failed:", err);
                    setError("Connection lost. Retrying...");
                }
            }
        };

        fetchModules();
        const interval = setInterval(fetchModules, 5000);

        return () => clearInterval(interval);
    }, [isLoading]);

    const getStatusColor = (status) => {
        if (!status) return '';
        const lowerStatus = status.toLowerCase();
        if (lowerStatus === 'online' || lowerStatus === 'normal') return 'status--ok';
        if (lowerStatus === 'warning') return 'status--warn';
        if (lowerStatus === 'critical' || lowerStatus === 'backup') return 'status--crit';
        return '';
    };

    return (
        <div className="monitor-container">
            <div className="dashboard-header">
                <h1>Colony Status Monitor</h1>
            </div>

            {isLoading && <div className="loading-spinner"></div>}
            {error && <p className="error-state">{error}</p>}
            
            {!isLoading && !error && (
                <div className="modules-grid">
                    {modules.map(module => (
                        <div key={module.id} className="module-card">
                            <h3 className="module-name">{module.name}</h3>
                            <p className="module-type">{module.type}</p>
                            
                            <div className="status-grid">
                                <div className="status-item">
                                    <span>Temperature</span>
                                    <span className="status-value">{module.temperature}°C</span>
                                </div>
                                <div className="status-item">
                                    <span>Humidity</span>
                                    <span className="status-value">{module.humidity}%</span>
                                </div>
                                <div className="status-item">
                                    <span>Oxygen (O₂)</span>
                                    <span className="status-value">{module.O2_level}%</span>
                                </div>
                                <div className="status-item">
                                    <span>Energy</span>
                                    <span className={`status-value ${getStatusColor(module.energy_status)}`}>
                                        {module.energy_status}
                                    </span>
                                </div>
                                <div className="status-item">
                                    <span>Supplies</span>
                                    <span className={`status-value ${getStatusColor(module.supplies_status)}`}>
                                        {module.supplies_status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatusMonitor;