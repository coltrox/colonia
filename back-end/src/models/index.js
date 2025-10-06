import sequelize from '../config/database.js';

import Location from './Location.js';
import StorageLocation from './StorageLocation.js';
import Supply from './Supply.js';
import TemperatureLog from './TemperatureLog.js';
import Module from './Module.js';
import ModuleLog from './ModuleLog.js';

const db = {};

db.sequelize = sequelize;
db.Location = Location;
db.StorageLocation = StorageLocation;
db.Supply = Supply;
db.TemperatureLog = TemperatureLog;
db.Module = Module;
db.ModuleLog = ModuleLog;

db.StorageLocation.hasMany(db.Supply, { foreignKey: 'locationId', as: 'supplies' });
db.Supply.belongsTo(db.StorageLocation, { foreignKey: 'locationId', as: 'location' });
db.Location.hasMany(db.TemperatureLog, { foreignKey: 'locationId', as: 'logs' });
db.TemperatureLog.belongsTo(db.Location, { foreignKey: 'locationId', as: 'location' });
db.Module.hasMany(db.ModuleLog, { 
    foreignKey: 'moduleName', 
    sourceKey: 'name', 
    as: 'history' 
});
db.ModuleLog.belongsTo(db.Module, { 
    foreignKey: 'moduleName', 
    targetKey: 'name', 
    as: 'module' 
});

export default db;