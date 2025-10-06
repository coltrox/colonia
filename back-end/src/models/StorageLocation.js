import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const StorageLocation = sequelize.define('StorageLocation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true, // REMOVA ESTA LINHA
        comment: 'Unique name for the storage location, e.g., "Freezer A-1"',
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    temperatureMin: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    temperatureMax: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    humidityMin: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    humidityMax: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    tableName: 'storage_locations',
    timestamps: true,
    // ADICIONE ESTE BLOCO 'indexes'
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
});

export default StorageLocation;