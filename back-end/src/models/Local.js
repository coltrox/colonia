import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Local = sequelize.define('Local', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Ex: Geladeira Principal, Freezer Estoque',
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  temperaturaAtual: {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: 'Última temperatura registrada para este local',
  },
}, {
  tableName: 'locais',
  timestamps: true,
});

export default Local;
