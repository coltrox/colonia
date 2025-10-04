const { Module, ModuleLog } = require('../models');

const simulateStatus = (value, range, variance = 0.5) => {
  const min = value - variance;
  const max = value + variance;
  const newValue = Math.random() * (max - min) + min;
  return Math.max(range.min, Math.min(range.max, newValue));
};

const logCurrentStatuses = async () => {
  console.log(`[LOG] Iniciando ciclo de monitoramento e log...`);
  try {
    const modules = await Module.findAll();

    for (const module of modules) {
      const newO2 = simulateStatus(module.O2_level, { min: 18.0, max: 22.0 }, 0.2);
      const newHumidity = simulateStatus(module.humidity, { min: 35.0, max: 55.0 }, 0.5);
      const newTemp = simulateStatus(module.temperature, { min: 21.0, max: 23.5 }, 0.3);

      let suppliesStatus = module.supplies_status;
      if (newO2 < 20.0 && newO2 > 19.5) {
          suppliesStatus = 'Warning';
      } else if (newO2 <= 19.5) {
          suppliesStatus = 'Critical';
      } else {
          suppliesStatus = 'Normal'; 
      }
      
      let energyStatus = module.energy_status;
      if (module.name === 'Máquinas & Sistemas / Energia' && Math.random() < 0.1) {
          energyStatus = energyStatus === 'Online' ? 'Backup' : 'Online'; 
      }

      await module.update({
        O2_level: parseFloat(newO2.toFixed(2)),
        humidity: parseFloat(newHumidity.toFixed(2)),
        temperature: parseFloat(newTemp.toFixed(2)),
        supplies_status: suppliesStatus,
        energy_status: energyStatus,
      });

      await ModuleLog.create({
        moduleName: module.name,
        O2_level: parseFloat(newO2.toFixed(2)),
        humidity: parseFloat(newHumidity.toFixed(2)),
        temperature: parseFloat(newTemp.toFixed(2)),
        supplies_status: suppliesStatus,
        energy_status: energyStatus,
      });
    }
    console.log(`[LOG] Ciclo de monitoramento concluído. ${modules.length} logs salvos.`);
  } catch (error) {
    console.error(`[ERRO LOG] Falha ao executar o agendamento:`, error);
  }
};

const startScheduler = () => {
  const intervalTime = 30000; 
  logCurrentStatuses();
  setInterval(logCurrentStatuses, intervalTime);
  console.log(`[Scheduler] Monitoramento agendado para rodar a cada ${intervalTime / 1000} segundos.`);
};

module.exports = startScheduler;