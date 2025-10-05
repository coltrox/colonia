import express from 'express';
import cors from 'cors'; // 1. Importe o pacote cors
import apiRoutes from './routes/apiRoutes.js';

const app = express();

// 2. Adicione o middleware do cors ANTES das rotas.
// Isto é o que resolve o erro de conexão.
app.use(cors());

// Middleware para que o Express entenda JSON
app.use(express.json());

// Rota de boas-vindas
app.get('/', (req, res) => {
    res.status(200).send('<h1>API de Monitoramento</h1><p>Servidor no ar!</p>');
});

// Diz ao App para usar as suas rotas com o prefixo /api
app.use('/api', apiRoutes);

export default app;