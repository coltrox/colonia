import app from './app.js';
import db from './models/index.js';

const PORT = process.env.PORT || 3000;

console.log('Iniciando sincronização com o banco de dados...');

// Usa a instância do sequelize exportada pelo nosso index.js
db.sequelize.sync({ alter: true }) // use { force: true } para recriar as tabelas do zero
  .then(() => {
    console.log('Banco de dados e tabelas sincronizados com sucesso.');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('======================================================');
    console.error('ERRO CRÍTICO: Não foi possível sincronizar com o banco de dados.');
    console.error(err.message);
    console.error('======================================================');
  });