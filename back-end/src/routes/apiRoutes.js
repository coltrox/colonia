import { Router } from 'express';
import db from '../models/index.js';

const router = Router();

// --- ROTAS PARA LOCAIS ---

// Rota para criar um novo local
router.post('/locais', async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'O nome do local é obrigatório.' });
    }
    const novoLocal = await db.Local.create({ nome, descricao });
    res.status(201).json(novoLocal);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar local: ' + error.message });
  }
});

// Rota para buscar todos os locais
router.get('/locais', async (req, res) => {
    try {
        const locais = await db.Local.findAll();
        res.status(200).json(locais);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar locais: ' + error.message });
    }
});


// --- ROTAS PARA MANTIMENTOS ---

// Rota para criar um novo mantimento
router.post('/mantimentos', async (req, res) => {
  try {
    const { nome, descricao, temperaturaMinima, temperaturaMaxima } = req.body;
    if (!nome || temperaturaMinima === undefined || temperaturaMaxima === undefined) {
      return res.status(400).json({ error: 'Nome, temperatura mínima e máxima são obrigatórios.' });
    }
    const novoMantimento = await db.Mantimento.create({ nome, descricao, temperaturaMinima, temperaturaMaxima });
    res.status(201).json(novoMantimento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar mantimento: ' + error.message });
  }
});

// Rota para buscar todos os mantimentos
router.get('/mantimentos', async (req, res) => {
    try {
        const mantimentos = await db.Mantimento.findAll();
        res.status(200).json(mantimentos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar mantimentos: ' + error.message });
    }
});


// --- ROTAS DE ASSOCIAÇÃO E LOGS ---

// Rota para associar um mantimento a um local
router.post('/locais/:localId/add-mantimento', async (req, res) => {
  try {
    const { mantimentoId } = req.body;
    const local = await db.Local.findByPk(req.params.localId);
    const mantimento = await db.Mantimento.findByPk(mantimentoId);

    if (!local || !mantimento) {
      return res.status(404).json({ error: 'Local ou mantimento não encontrado.' });
    }

    await local.addMantimento(mantimento);
    res.status(200).json({ message: `'${mantimento.nome}' associado a '${local.nome}' com sucesso.` });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao associar mantimento: ' + error.message });
  }
});

// Rota para adicionar um log de temperatura a um local
router.post('/locais/:localId/logs', async (req, res) => {
    try {
        const { temperatura } = req.body;
        const local = await db.Local.findByPk(req.params.localId);

        if (!local) {
            return res.status(404).json({ error: 'Local não encontrado.' });
        }
        if (temperatura === undefined) {
            return res.status(400).json({ error: 'A temperatura é obrigatória.' });
        }

        const novoLog = await db.LogTemperatura.create({ temperatura, localId: local.id });
        res.status(201).json(novoLog);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar log: ' + error.message });
    }
});

// Rota para ver todos os dados de um local (incluindo mantimentos e logs)
router.get('/locais/:localId/details', async (req, res) => {
    try {
        const local = await db.Local.findByPk(req.params.localId, {
            include: [
                { model: db.Mantimento, as: 'Mantimentos' }, // Sequelize usa o nome do modelo no plural por padrão
                { model: db.LogTemperatura, as: 'logs' }
            ]
        });

        if (!local) {
            return res.status(404).json({ error: 'Local não encontrado.' });
        }
        res.status(200).json(local);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar detalhes do local: ' + error.message });
    }
});


export default router;