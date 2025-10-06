import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const API_URL = 'http://localhost:3000/api';

const initialNewLocationState = {
    name: '',
    description: '',
    temperatureMin: '18.0',
    temperatureMax: '24.0',
    humidityMin: '30.0',
    humidityMax: '60.0',
    idealPressure: '101.3',
    maxRadiation: '0.05',
    maxCo2: '1000',
    minO2: '19.5',
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState(initialNewLocationState);
    
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLocations();
    }, []);

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => setMessage({ text: '', type: '' }), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const fetchLocations = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/locations`);
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
            setMessage({ text: 'Failed to load locations. Is the server online?', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLocation({ ...newLocation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newLocation.name) {
            setMessage({ text: 'Location name is required.', type: 'error' });
            return;
        }
        try {
            const payload = {
                name: newLocation.name,
                description: newLocation.description,
                temperatureMin: parseFloat(newLocation.temperatureMin),
                temperatureMax: parseFloat(newLocation.temperatureMax),
                humidityMin: parseFloat(newLocation.humidityMin),
                humidityMax: parseFloat(newLocation.humidityMax),
                idealPressure: parseFloat(newLocation.idealPressure),
                maxRadiation: parseFloat(newLocation.maxRadiation),
                maxCo2: parseFloat(newLocation.maxCo2),
                minO2: parseFloat(newLocation.minO2),
            };

            await axios.post(`${API_URL}/locations`, payload);
            setMessage({ text: `Location "${newLocation.name}" created successfully!`, type: 'success' });
            setNewLocation(initialNewLocationState);
            fetchLocations();
        } catch (error) {
            console.error('Error creating location:', error);
            setMessage({ text: 'Error creating location. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="dashboard-container">
            {message.text && (
                <div className={`toast-message ${message.type}`}>
                    {message.text}
                </div>
            )}
            
            <div className="dashboard-header">
                <h1>Locations Dashboard</h1>
                <button className="back-button" onClick={() => navigate('/home')}>
                    &larr; Back to Command Center
                </button>
            </div>

            <div className="dashboard-grid"> 
                
                <div className="card">
                    <h2>Registered Locations</h2>
                    {isLoading ? (
                        <div className="loading-spinner"></div>
                    ) : locations.length > 0 ? (
                        <ul className="locations-list">
                            {locations.map((location) => (
                                <li key={location.id} className="location-item">
                                    <div className="location-item-header">
                                        <strong>{location.name}</strong>
                                        {location.description && <p>{location.description}</p>}
                                    </div>
                                    <div className="details-grid">
                                        <span>Temp: {location.temperatureMin}°C to {location.temperatureMax}°C</span>
                                        <span>Humidity: {location.humidityMin}% to {location.humidityMax}%</span>
                                        <span>Pressure: {location.idealPressure} kPa</span>
                                        <span>Max CO₂: {location.maxCo2} ppm</span>
                                        <span>Min O₂: {location.minO2} %</span>
                                        <span>Radiation: {location.maxRadiation} mSv/h</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-state">No locations registered yet.</p>
                    )}
                </div>
                
                <div className="card form-card">
                    <h2>Add New Location</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group full-width">
                            <label htmlFor="name">Location Name</label>
                            <input id="name" type="text" name="name" value={newLocation.name} onChange={handleInputChange} placeholder="Ex: Beta Greenhouse" />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="description">Description</label>
                            <input id="description" type="text" name="description" value={newLocation.description} onChange={handleInputChange} placeholder="Optional" />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="temperatureMin">Temperature (°C)</label>
                            <div className="input-row">
                                <input id="temperatureMin" type="number" step="0.1" name="temperatureMin" value={newLocation.temperatureMin} onChange={handleInputChange} placeholder="Min." />
                                <input type="number" step="0.1" name="temperatureMax" value={newLocation.temperatureMax} onChange={handleInputChange} placeholder="Max." />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="humidityMin">Humidity (%)</label>
                            <div className="input-row">
                                <input id="humidityMin" type="number" step="0.1" name="humidityMin" value={newLocation.humidityMin} onChange={handleInputChange} placeholder="Min." />
                                <input type="number" step="0.1" name="humidityMax" value={newLocation.humidityMax} onChange={handleInputChange} placeholder="Max." />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idealPressure">Ideal Pressure (kPa)</label>
                            <input id="idealPressure" type="number" step="0.1" name="idealPressure" value={newLocation.idealPressure} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxCo2">Max CO₂ (ppm)</label>
                            <input id="maxCo2" type="number" name="maxCo2" value={newLocation.maxCo2} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="minO2">Min O₂ (%)</label>
                            <input id="minO2" type="number" step="0.1" name="minO2" value={newLocation.minO2} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxRadiation">Max Radiation (mSv/h)</label>
                            <input id="maxRadiation" type="number" step="0.01" name="maxRadiation" value={newLocation.maxRadiation} onChange={handleInputChange} />
                        </div>
                        
                        <button type="submit" className="submit-button">Add Location</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
