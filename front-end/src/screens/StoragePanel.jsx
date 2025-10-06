import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Reutilizando os mesmos estilos!

const API_URL = 'http://localhost:3000/api';

const initialFormState = {
    name: '',
    description: '',
    temperatureMin: '18.0',
    temperatureMax: '24.0',
    humidityMin: '40.0',
    humidityMax: '60.0',
};

const StoragePanel = () => {
    const navigate = useNavigate();
    const [storageLocations, setStorageLocations] = useState([]);
    const [newLocation, setNewLocation] = useState(initialFormState);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(true);

    const fetchStorageLocations = async () => {
        try {
            const response = await axios.get(`${API_URL}/storage-locations`);
            setStorageLocations(response.data);
        } catch (error) {
            console.error('Failed to fetch storage locations:', error);
            setMessage({ text: 'Failed to load storage locations.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStorageLocations();
    }, []);

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => setMessage({ text: '', type: '' }), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleInputChange = (e) => {
        setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newLocation.name) {
            setMessage({ text: 'Location name is required.', type: 'error' });
            return;
        }
        try {
            const payload = {
                ...newLocation,
                temperatureMin: parseFloat(newLocation.temperatureMin),
                temperatureMax: parseFloat(newLocation.temperatureMax),
                humidityMin: parseFloat(newLocation.humidityMin),
                humidityMax: parseFloat(newLocation.humidityMax),
            };
            await axios.post(`${API_URL}/storage-locations`, payload);
            setMessage({ text: `Storage location "${newLocation.name}" created!`, type: 'success' });
            setNewLocation(initialFormState);
            fetchStorageLocations(); // Recarrega a lista
        } catch (error) {
            console.error('Error creating storage location:', error);
            setMessage({ text: 'Error creating storage location.', type: 'error' });
        }
    };

    return (
        <div className="dashboard-container">
            {message.text && <div className={`toast-message ${message.type}`}>{message.text}</div>}
            
            <div className="dashboard-header">
                <h1>Storage Locations Panel</h1>
                <button className="back-button" onClick={() => navigate('/home')}>
                    &larr; Back to Command Center
                </button>
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <h2>Registered Storage Locations</h2>
                    {isLoading ? (
                        <div className="loading-spinner"></div>
                    ) : storageLocations.length > 0 ? (
                        <ul className="locations-list">
                            {storageLocations.map((loc) => (
                                <li key={loc.id} className="location-item">
                                    <div className="location-item-header">
                                        <strong>{loc.name}</strong>
                                        {loc.description && <p>{loc.description}</p>}
                                    </div>
                                    <div className="details-grid">
                                        <span>Temp: {loc.temperatureMin}°C to {loc.temperatureMax}°C</span>
                                        <span>Humidity: {loc.humidityMin}% to {loc.humidityMax}%</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-state">No storage locations registered yet.</p>
                    )}
                </div>

                <div className="card form-card">
                    <h2>Add New Storage Location</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group full-width">
                            <label htmlFor="name">Location Name</label>
                            <input id="name" type="text" name="name" value={newLocation.name} onChange={handleInputChange} placeholder="e.g., Freezer Unit B-2" required />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="description">Description (Optional)</label>
                            <input id="description" type="text" name="description" value={newLocation.description} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="temperatureMin">Min Temp (°C)</label>
                            <input id="temperatureMin" type="number" step="0.1" name="temperatureMin" value={newLocation.temperatureMin} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="temperatureMax">Max Temp (°C)</label>
                            <input id="temperatureMax" type="number" step="0.1" name="temperatureMax" value={newLocation.temperatureMax} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="humidityMin">Min Humidity (%)</label>
                            <input id="humidityMin" type="number" step="0.1" name="humidityMin" value={newLocation.humidityMin} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="humidityMax">Max Humidity (%)</label>
                            <input id="humidityMax" type="number" step="0.1" name="humidityMax" value={newLocation.humidityMax} onChange={handleInputChange} />
                        </div>
                        <button type="submit" className="submit-button">Add Storage Location</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StoragePanel;