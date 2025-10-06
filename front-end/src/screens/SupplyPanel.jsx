import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; 

const API_URL = 'http://localhost:3000/api';

const initialSupplyState = {
    name: '',
    description: '',
    minTemperature: '-18.0',
    maxTemperature: '-4.0',
    locationId: '',
};

const SupplyPanel = () => {
    const navigate = useNavigate();
    const [supplies, setSupplies] = useState([]);
    const [locations, setLocations] = useState([]);
    const [newSupply, setNewSupply] = useState(initialSupplyState);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [suppliesRes, locationsRes] = await Promise.all([
                    axios.get(`${API_URL}/supplies`),
                    // CORRIGIDO: Busca da API de storage-locations
                    axios.get(`${API_URL}/storage-locations`),
                ]);
                setSupplies(suppliesRes.data);
                setLocations(locationsRes.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setMessage({ text: 'Failed to load data. Is the back-end running?', type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => setMessage({ text: '', type: '' }), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupply({ ...newSupply, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newSupply.name || !newSupply.locationId) {
            setMessage({ text: 'Supply name and location are required.', type: 'error' });
            return;
        }
        try {
            const payload = {
                ...newSupply,
                minTemperature: parseFloat(newSupply.minTemperature),
                maxTemperature: parseFloat(newSupply.maxTemperature),
                locationId: parseInt(newSupply.locationId, 10),
            };

            await axios.post(`${API_URL}/supplies`, payload);
            setMessage({ text: `Supply "${newSupply.name}" added successfully!`, type: 'success' });
            
            const updatedSupplies = await axios.get(`${API_URL}/supplies`);
            setSupplies(updatedSupplies.data);
            setNewSupply(initialSupplyState);
        } catch (error) {
            console.error('Error creating supply:', error);
            setMessage({ text: 'Error creating supply. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="dashboard-container">
            {message.text && (
                <div className={`toast-message ${message.type}`}>{message.text}</div>
            )}
            
            <div className="dashboard-header">
                <h1>Supply Panel</h1>
                <button className="back-button" onClick={() => navigate('/home')}>
                    &larr; Back to Command Center
                </button>
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <h2>Registered Supplies</h2>
                    {isLoading ? (
                        <div className="loading-spinner"></div>
                    ) : supplies.length > 0 ? (
                        <ul className="locations-list">
                            {supplies.map((supply) => (
                                <li key={supply.id} className="location-item">
                                    <div className="location-item-header">
                                        <strong>{supply.name}</strong>
                                        {supply.description && <p>{supply.description}</p>}
                                    </div>
                                    <div className="details-grid">
                                        <span>Temp Range: {supply.minTemperature}°C to {supply.maxTemperature}°C</span>
                                        <span>Location: {locations.find(loc => loc.id === supply.locationId)?.name || 'Unknown'}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-state">No supplies registered yet.</p>
                    )}
                </div>

                <div className="card form-card">
                    <h2>Add New Supply</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group full-width">
                            <label htmlFor="name">Supply Name</label>
                            <input id="name" type="text" name="name" value={newSupply.name} onChange={handleInputChange} placeholder="e.g., Protein Ration Pack" />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="description">Description (Optional)</label>
                            <input id="description" type="text" name="description" value={newSupply.description} onChange={handleInputChange} />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="minTemperature">Min Temp (°C)</label>
                            <input id="minTemperature" type="number" step="0.1" name="minTemperature" value={newSupply.minTemperature} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxTemperature">Max Temp (°C)</label>
                            <input id="maxTemperature" type="number" step="0.1" name="maxTemperature" value={newSupply.maxTemperature} onChange={handleInputChange} />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="locationId">Storage Location</label>
                            <select id="locationId" name="locationId" value={newSupply.locationId} onChange={handleInputChange} required>
                                <option value="">-- Select a location --</option>
                                {locations.map(location => (
                                    <option key={location.id} value={location.id}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <button type="submit" className="submit-button">Add Supply</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SupplyPanel;