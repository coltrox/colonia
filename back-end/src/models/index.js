import sequelize from '../config/database.js';
import Local from './Local.js';
import Mantimento from './Mantimentos.js';
import LogTemperatura from './LogTemperatura.js';

const db = {};

db.sequelize = sequelize;
db.Local = Local;
db.Mantimento = Mantimento;
db.LogTemperatura = LogTemperatura;

// --- DEFINIÇÃO DAS ASSOCIAÇÕES ---

// Associação: Um Local pode ter muitos Mantimentos (relação N:M)
// Uma tabela intermediária `local_mantimentos` será criada automaticamente.
db.Local.belongsToMany(db.Mantimento, { through: 'local_mantimentos' });
db.Mantimento.belongsToMany(db.Local, { through: 'local_mantimentos' });

// Associação: Um Local pode ter muitos Logs de Temperatura (relação 1:N)
db.Local.hasMany(db.LogTemperatura, {
  foreignKey: 'localId',
  as: 'logs',
});
db.LogTemperatura.belongsTo(db.Local, {
  foreignKey: 'localId',
  as: 'local',
});

export default db;