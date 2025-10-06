import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Location = sequelize.define('Location', {
    // ... (id, name, description inalterados) ...
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
    },
    // CORRIGIDO: Nomes de colunas padronizados para inglês (camelCase)
    temperatureMin: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 18.0,
    },
    temperatureMax: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 24.0,
    },
    humidityMin: {
        type: DataTypes.FLOAT,
        defaultValue: 30.0,
    },
    humidityMax: {
        type: DataTypes.FLOAT,
        defaultValue: 60.0,
    },
    idealPressure: {
        type: DataTypes.FLOAT,
        defaultValue: 101.3,
    },
    maxRadiation: {
        type: DataTypes.FLOAT,
        defaultValue: 0.05,
    },
    maxCo2: {
        type: DataTypes.FLOAT,
        defaultValue: 1000,
    },
    minO2: {
        type: DataTypes.FLOAT,
        defaultValue: 19.5,
    }
}, {
    tableName: 'locations',
    timestamps: true,
});

export default Location;