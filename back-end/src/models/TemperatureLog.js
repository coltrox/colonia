import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TemperatureLog = sequelize.define('TemperatureLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Recorded temperature at the moment of log',
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: 'Date and time when the record was made',
  },
}, {
  tableName: 'temperature_logs',
  timestamps: false,
});

export default TemperatureLog;
