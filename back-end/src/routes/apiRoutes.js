import { Router } from 'express';
import db from '../models/index.js';
// Importa as novas funções do scheduler para gerir alertas em memória
import { getAlerts, resolveAlert } from '../scheduler/temperatureScheduler.js';

const router = Router();

// --- SIMULADOR DE LOGS DO SISTEMA (para o painel principal) ---
let systemLogs = [
    '> Conexão com a Terra estabelecida.',
    '> Suporte de vida estável: O₂ 21%, N₂ 78%',
    '> Reatores de fusão online: 100%',
    '> Iniciando sistemas da colônia A-01...',
];
const possibleLogs = [
    'Nave de carga 7 atracou na doca 3.',
    'Anomalia magnética detectada no setor 9.',
    'Recicladores de O₂ operando a 99.8% de eficiência.',
    'Painéis solares reorientados. Carga: 97%.',
    'Alerta: micro-meteoroide se aproximando. Escudos ativados.'
];
setInterval(() => {
    const newMessage = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
    systemLogs.unshift(`> ${newMessage}`);
    if (systemLogs.length > 6) systemLogs.pop();
}, 5000);

router.get('/system-logs', (req, res) => {
    res.status(200).json(systemLogs);
});


// --- ROTAS DE ALERTAS DE AMBIENTE ---

// Rota para buscar os alertas ATIVOS que estão em memória
router.get('/alerts', (req, res) => {
    const activeAlerts = getAlerts();
    res.status(200).json(activeAlerts);
});

// Rota para "resolver" (remover) um alerta da lista em memória
router.post('/alerts/:id/resolve', (req, res) => {
    const alertId = req.params.id;
    const wasResolved = resolveAlert(alertId);
    if (wasResolved) {
        res.status(200).json({ message: `Alerta para o local ${alertId} foi resolvido.` });
    } else {
        res.status(404).json({ error: `Nenhum alerta ativo encontrado para o local ${alertId}.` });
    }
});


// --- ROTAS PARA LOCAIS ---

// ATUALIZADO: A rota de criação agora aceita a faixa de temperatura para o local
router.post('/locais', async (req, res) => {
  try {
    const { nome, descricao, temperaturaMinima, temperaturaMaxima } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'O nome do local é obrigatório.' });
    }
    const novoLocal = await db.Local.create({ nome, descricao, temperaturaMinima, temperaturaMaxima });
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

// Rota para ver todos os dados de um local (incluindo logs de temperatura)
router.get('/locais/:localId/details', async (req, res) => {
    try {
        const local = await db.Local.findByPk(req.params.localId, {
            include: [{ model: db.LogTemperatura, as: 'logs' }]
        });
        if (!local) {
            return res.status(404).json({ error: 'Local não encontrado.' });
        }
        res.status(200).json(local);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar detalhes do local: ' + error.message });
    }
});

// Rota para adicionar um log de temperatura a um local manualmente (para testes)
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


export default router;