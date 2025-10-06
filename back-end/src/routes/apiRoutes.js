import { Router } from 'express';
import db from '../models/index.js';
import { getAlerts, resolveAlert } from '../scheduler/temperatureScheduler.js';

// 1. IMPORTE O MODULE CONTROLLER
import * as moduleController from '../controllers/ModuleController.js';

const router = Router();

// --- Rotas de System Logs e Alerts ---
let systemLogs = ['> Connection with Earth established.'];
const possibleLogs = ['Cargo ship 7 has docked.', 'Magnetic anomaly detected.', 'O₂ recyclers at 99.8% efficiency.'];
setInterval(() => {
    const newMessage = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
    systemLogs.unshift(`> ${newMessage}`);
    if (systemLogs.length > 6) systemLogs.pop();
}, 7000);

router.get('/system-logs', (req, res) => { res.status(200).json(systemLogs); });
router.get('/alerts', (req, res) => { res.status(200).json(getAlerts()); });
router.post('/alerts/:id/resolve', (req, res) => {
    const wasResolved = resolveAlert(req.params.id);
    if (wasResolved) res.status(200).json({ message: `Alert resolved.` });
    else res.status(404).json({ error: `No active alert found.` });
});

// 2. ADICIONE A ROTA PARA OS MÓDULOS
router.get('/modules', moduleController.getAllModuleStatuses);


// --- ROTAS PARA LOCATIONS (ANTIGAS, se você ainda as usa) ---
router.get('/locations', async (req, res) => {
    try {
        const locations = await db.Location.findAll();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching locations: ' + error.message });
    }
});
router.post('/locations', async (req, res) => {
  try {
    const newLocation = await db.Location.create(req.body);
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: 'Error creating location: ' + error.message });
  }
});

// --- ROUTES FOR SUPPLIES ---
router.get('/supplies', async (req, res) => {
    try {
        const supplies = await db.Supply.findAll({ 
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(supplies);
    } catch (error) {
        console.error("Error fetching supplies:", error);
        res.status(500).json({ error: 'Error fetching supplies.' });
    }
});

router.post('/supplies', async (req, res) => {
    try {
        const { name, description, minTemperature, maxTemperature, locationId } = req.body;
        
        const storageLocation = await db.StorageLocation.findByPk(locationId);
        if (!storageLocation) {
            return res.status(404).json({ error: 'The specified storage location does not exist.' });
        }

        if (!name || !locationId) {
            return res.status(400).json({ error: 'Supply name and locationId are required.' });
        }

        const newSupply = await db.Supply.create({
            name,
            description,
            minTemperature,
            maxTemperature,
            locationId
        });
        res.status(201).json(newSupply);
    } catch (error) {
        console.error("Error creating supply:", error);
        res.status(500).json({ error: 'Error creating supply.' });
    }
});

export default router;