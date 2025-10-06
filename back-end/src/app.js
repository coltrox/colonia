import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';
import storageLocationRoutes from './routes/storageLocationRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send('<h1>Monitoring API</h1><p>Server is up!</p>');
});

app.use('/api', apiRoutes);
app.use('/api/storage-locations', storageLocationRoutes);

export default app;