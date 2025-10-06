import { Router } from 'express';
import db from '../models/index.js';

const router = Router();

// GET /api/storage-locations - Rota para buscar todos os locais de armazenamento
router.get('/', async (req, res) => {
    try {
        const locations = await db.StorageLocation.findAll({ order: [['name', 'ASC']] });
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching storage locations:", error);
        res.status(500).json({ error: 'Failed to fetch storage locations.' });
    }
});

// GET /api/storage-locations/:id - Rota para buscar um local específico por ID
router.get('/:id', async (req, res) => {
    try {
        const location = await db.StorageLocation.findByPk(req.params.id);
        if (location) {
            res.status(200).json(location);
        } else {
            res.status(404).json({ error: 'Storage location not found.' });
        }
    } catch (error) {
        console.error("Error fetching storage location:", error);
        res.status(500).json({ error: 'Failed to fetch storage location.' });
    }
});

// POST /api/storage-locations - Rota para criar um novo local de armazenamento
router.post('/', async (req, res) => {
    try {
        const { name, description, temperatureMin, temperatureMax, humidityMin, humidityMax } = req.body;
        if (!name || temperatureMin === undefined || temperatureMax === undefined) {
            return res.status(400).json({ error: 'Name, min temperature, and max temperature are required.' });
        }
        const newLocation = await db.StorageLocation.create(req.body);
        res.status(201).json(newLocation);
    } catch (error) {
        console.error("Error creating storage location:", error);
        res.status(500).json({ error: 'Failed to create storage location.' });
    }
});

// PUT /api/storage-locations/:id - Rota para atualizar um local de armazenamento
router.put('/:id', async (req, res) => {
    try {
        const location = await db.StorageLocation.findByPk(req.params.id);
        if (location) {
            await location.update(req.body);
            res.status(200).json(location);
        } else {
            res.status(404).json({ error: 'Storage location not found.' });
        }
    } catch (error) {
        console.error("Error updating storage location:", error);
        res.status(500).json({ error: 'Failed to update storage location.' });
    }
});

// DELETE /api/storage-locations/:id - Rota para deletar um local de armazenamento
router.delete('/:id', async (req, res) => {
    try {
        const location = await db.StorageLocation.findByPk(req.params.id);
        if (location) {
            await location.destroy();
            res.status(204).send(); // 204 No Content
        } else {
            res.status(404).json({ error: 'Storage location not found.' });
        }
    } catch (error) {
        console.error("Error deleting storage location:", error);
        res.status(500).json({ error: 'Failed to delete storage location.' });
    }
});

export default router;