import db from '../models/index.js';

// Rota para listar todos os módulos (Último Status Conhecido)
const getAllModuleStatuses = async (req, res) => {
  try {
    const modules = await db.Module.findAll({ 
        attributes: ['id', 'name', 'type', 'O2_level', 'humidity', 'temperature', 'supplies_status', 'energy_status']
    });
    res.json(modules);
  } catch (error) {
    console.error('Erro ao buscar status dos módulos:', error);
    res.status(500).json({ message: 'Erro interno ao processar a solicitação.' });
  }
};

// Rota para buscar o status de um módulo específico
const getModuleStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await db.Module.findByPk(id, {
        attributes: ['id', 'name', 'type', 'O2_level', 'humidity', 'temperature', 'supplies_status', 'energy_status']
    });

    if (!module) {
      return res.status(404).json({ message: 'Módulo não encontrado.' });
    }
    res.json(module);
  } catch (error) {
    console.error('Erro ao buscar status do módulo:', error);
    res.status(500).json({ message: 'Erro interno ao processar a solicitação.' });
  }
};

// Rota para buscar o HISTÓRICO DE LOGS de um módulo pelo nome
const getModuleHistoryByName = async (req, res) => {
    try {
        const { name } = req.params;
        const history = await db.ModuleLog.findAll({
            where: { moduleName: name },
            limit: 50, // Limita aos últimos 50 registros
            order: [['createdAt', 'DESC']], // Mais recentes primeiro
        });

        if (history.length === 0) {
            return res.status(404).json({ message: `Histórico não encontrado para o módulo: ${name}` });
        }
        res.json(history);
    } catch (error) {
        console.error('Erro ao buscar histórico do módulo:', error);
        res.status(500).json({ message: 'Erro interno ao processar a solicitação.' });
    }
};

// Exporta as funções no padrão ES Modules
export {
  getAllModuleStatuses,
  getModuleStatusById,
  getModuleHistoryByName,
};