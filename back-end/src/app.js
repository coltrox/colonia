import express from 'express';
import apiRoutes from './routes/apiRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Servidor Express funcionando!</h1><p>Acesse /api para ver as rotas da API.</p>');
});

app.use('/api', apiRoutes);

export default app;
