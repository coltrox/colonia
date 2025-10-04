const { DataTypes } = require('sequelize');

// Este modelo armazena o ÚLTIMO STATUS CONHECIDO de cada módulo.
module.exports = (sequelize) => {
  const Module = sequelize.define('Module', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Nome do módulo (ex: Centro Comum, Habitacional 1)',
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Tipo de função (ex: social, suporte, habitacional)',
    },
    // Estes campos representam o ÚLTIMO STATUS CONHECIDO, atualizado pelo Scheduler
    O2_level: {
      type: DataTypes.FLOAT,
      defaultValue: 20.9,
      comment: 'Nível de Oxigênio (em %)',
    },
    humidity: {
      type: DataTypes.FLOAT,
      defaultValue: 45.0,
      comment: 'Umidade do Ar (em %)',
    },
    temperature: {
      type: DataTypes.FLOAT,
      defaultValue: 22.0,
      comment: 'Temperatura (em Celsius)',
    },
    supplies_status: {
      type: DataTypes.STRING,
      defaultValue: 'Normal',
      comment: 'Status de Mantimentos/Estoque',
    },
    energy_status: {
      type: DataTypes.STRING,
      defaultValue: 'Online',
      comment: 'Status de Geração/Bateria',
    },
  }, {
    tableName: 'modules',
  });

  // Função para popular o banco de dados com os módulos iniciais
  Module.seed = async () => {
    const modules = [
      { name: 'Núcleo Central', type: 'control' },
      { name: 'Centro Comum', type: 'social', supplies_status: 'Warning' },
      { name: 'Laboratório 1 / Engenharia', type: 'work' },
      { name: 'Laboratório 2 / Saúde & Academia', type: 'health' },
      { name: 'Módulo de Hidroponia', type: 'support', O2_level: 21.5 }, 
      { name: 'Estação de Água / Suporte de Vida', type: 'support', supplies_status: 'Critical' }, 
      { name: 'Máquinas & Sistemas / Energia', type: 'support', energy_status: 'Backup' },
      { name: 'Armazenamento / Suprimentos', type: 'logistics' },
      { name: 'Habitacional 1', type: 'habitational' },
      { name: 'Habitacional 2', type: 'habitational' },
      { name: 'Habitacional 3', type: 'habitational' },
      { name: 'Habitacional 4', type: 'habitational' },
    ];

    for (const modData of modules) {
      await Module.findOrCreate({ where: { name: modData.name }, defaults: modData });
    }
    console.log('Dados iniciais dos módulos garantidos.');
  };

  return Module;
};