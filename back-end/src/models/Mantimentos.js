import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Mantimento = sequelize.define('Mantimento', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Ex: Carne Bovina, Sorvete de Morango, Vacina X',
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  temperaturaMinima: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Temperatura mínima ideal para conservação',
  },
  temperaturaMaxima: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Temperatura máxima ideal para conservação',
  },
}, {
  tableName: 'mantimentos',
  timestamps: true,
});

export default Mantimento;