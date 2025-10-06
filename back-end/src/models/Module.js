import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const Module = sequelize.define('Module', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    O2_level: {
      type: DataTypes.FLOAT,
      defaultValue: 20.9,
    },
    humidity: {
      type: DataTypes.FLOAT,
      defaultValue: 45.0,
    },
    temperature: {
      type: DataTypes.FLOAT,
      defaultValue: 22.0,
    },
    supplies_status: {
      type: DataTypes.STRING,
      defaultValue: 'Normal',
    },
    energy_status: {
      type: DataTypes.STRING,
      defaultValue: 'Online',
    },
}, {
    tableName: 'modules',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
});

// A função de seed continua a mesma...
export const seedModules = async () => { /* ...código inalterado... */ };

export default Module;