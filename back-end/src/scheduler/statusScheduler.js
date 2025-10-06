import db from '../models/index.js';

// Função para simular pequenas variações nos dados
const simulateStatus = (value, range, variance = 0.5) => {
  const min = value - variance;
  const max = value + variance;
  const newValue = Math.random() * (max - min) + min;
  return Math.max(range.min, Math.min(range.max, newValue));
};

const logCurrentStatuses = async () => {
  console.log(`[Scheduler] Running monitoring and logging cycle...`);
  try {
    const modules = await db.Module.findAll();
    if (modules.length === 0) {
        console.log('[Scheduler] No modules found to monitor. Seeding may be required.');
        return;
    }

    for (const module of modules) {
      // Simula novos valores
      const newO2 = simulateStatus(module.O2_level, { min: 18.0, max: 22.0 }, 0.2);
      const newHumidity = simulateStatus(module.humidity, { min: 35.0, max: 55.0 }, 0.5);
      const newTemp = simulateStatus(module.temperature, { min: 21.0, max: 23.5 }, 0.3);
      
      // Simula mudança de status
      let energyStatus = module.energy_status;
      if (module.name === 'Machines & Systems / Energy' && Math.random() < 0.1) {
          energyStatus = energyStatus === 'Online' ? 'Backup' : 'Online'; 
      }

      // 1. ATUALIZA o status atual na tabela 'modules'
      await module.update({
        O2_level: parseFloat(newO2.toFixed(2)),
        humidity: parseFloat(newHumidity.toFixed(2)),
        temperature: parseFloat(newTemp.toFixed(2)),
        energy_status: energyStatus,
      });

      // 2. CRIA um novo registro histórico na tabela 'module_logs'
      await db.ModuleLog.create({
        moduleName: module.name,
        O2_level: parseFloat(newO2.toFixed(2)),
        humidity: parseFloat(newHumidity.toFixed(2)),
        temperature: parseFloat(newTemp.toFixed(2)),
        supplies_status: module.supplies_status, // Mantém o mesmo para simplicidade
        energy_status: energyStatus,
      });
    }
    console.log(`[Scheduler] Cycle completed. ${modules.length} modules updated and logged.`);
  } catch (error) {
    console.error(`[Scheduler] ERROR: Failed to execute schedule:`, error);
  }
};

// Função que inicia o agendador
export const startScheduler = () => {
  const intervalTime = 10000; // A cada 10 segundos
  logCurrentStatuses(); // Roda uma vez imediatamente
  setInterval(logCurrentStatuses, intervalTime);
  console.log(`[Scheduler] Monitoring scheduled to run every ${intervalTime / 1000} seconds.`);
};