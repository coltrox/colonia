import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ModuleLog = sequelize.define('ModuleLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Chave estrangeira que referencia o nome único do módulo
    moduleName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'modules', // Nome da tabela de Módulos
            key: 'name',      // Chave na tabela de Módulos
        }
    },
    O2_level: {
        type: DataTypes.FLOAT,
        comment: 'Oxygen level (%) at the time of log',
    },
    humidity: {
        type: DataTypes.FLOAT,
        comment: 'Air humidity (%) at the time of log',
    },
    temperature: {
        type: DataTypes.FLOAT,
        comment: 'Temperature (Celsius) at the time of log',
    },
    supplies_status: {
        type: DataTypes.STRING,
        comment: 'Supplies/Stock status at the time of log',
    },
    energy_status: {
        type: DataTypes.STRING,
        comment: 'Energy/Battery status at the time of log',
    },
}, {
    tableName: 'module_logs',
    // Timestamps (createdAt, updatedAt) são muito úteis para logs
    timestamps: true, 
    // Não precisamos de 'updatedAt' para um log, então podemos desativá-lo
    updatedAt: false,
});

export default ModuleLog;