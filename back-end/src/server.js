import app from './app.js';
import db from './models/index.js';
// 1. IMPORTAR a função que inicia o monitor de temperatura
import { startTemperatureMonitor } from './scheduler/temperatureScheduler.js';

const PORT = process.env.PORT || 3000;

console.log('Iniciando o servidor e sincronizando com o banco de dados...');

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Banco de dados e tabelas sincronizados com sucesso.');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
        // 2. EXECUTAR a função para iniciar o monitor após o servidor arrancar
        startTemperatureMonitor();
    });
  })
  .catch(err => {
    console.error('======================================================');
    console.error('ERRO CRÍTICO: Não foi possível sincronizar com o banco de dados.');
    console.error(err.message);
    console.error('======================================================');
  });