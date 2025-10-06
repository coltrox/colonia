import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Supply = sequelize.define('Supply', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  minTemperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  maxTemperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'storage_locations',
      key: 'id',
    },
  },
}, {
  tableName: 'supplies',
  timestamps: true,
});

export default Supply;