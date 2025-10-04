import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const LogTemperatura = sequelize.define('LogTemperatura', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  temperatura: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Temperatura registrada no momento do log',
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Data e hora em que o registro foi feito',
  },
}, {
  tableName: 'logs_temperatura',
  timestamps: false,
});

export default LogTemperatura;

