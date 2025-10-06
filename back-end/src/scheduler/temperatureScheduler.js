import db from '../models/index.js';

// Lista de alertas ativos, armazenada apenas na memória do servidor.
let activeAlerts = [];

// Função que simula a temperatura ambiente de um local, com anomalias ocasionais.
function simulateAmbientTemperature(location) {
    // CORRIGIDO: Usa os nomes de propriedade em inglês do objeto 'location'
    const baseTemp = (location.temperatureMax + location.temperatureMin) / 2;
    let variation = (Math.random() - 0.5) * 1.5;

    // 15% de chance de gerar uma anomalia
    if (Math.random() < 0.15) {
        // CORRIGIDO: Usa a propriedade 'name'
        console.log(`[SIMULATOR]: Generating temperature anomaly for '${location.name}'...`);
        const faultVariation = (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 7);
        variation = faultVariation;
    }

    return parseFloat((baseTemp + variation).toFixed(2));
}

export function startTemperatureMonitor() {
    console.log('🌡️  Colony Environment Monitor started. Checking every 1 minute...');

    setInterval(async () => {
        try {
            // CORRIGIDO: Usa o modelo db.Location
            const locations = await db.Location.findAll();
            if (!locations.length) {
                console.log('[MONITOR]: No locations found in the database. Add locations to start monitoring.');
                return;
            }

            for (const location of locations) {
                const currentTemperature = simulateAmbientTemperature(location);
                
                // CORRIGIDO: Usa o modelo db.TemperatureLog e os nomes de colunas em inglês
                await db.TemperatureLog.create({
                    temperature: currentTemperature,
                    locationId: location.id
                });

                // CORRIGIDO: Faz a desestruturação das propriedades com nomes em inglês
                const { temperatureMin: minTemp, temperatureMax: maxTemp, name, id } = location;

                // Se estiver fora da faixa, GERA um alerta.
                if (currentTemperature < minTemp || currentTemperature > maxTemp) {
                    const alertMessage = `ENVIRONMENT ALERT in '${name}': Temp. of ${currentTemperature}°C is outside the safe range (${minTemp}°C to ${maxTemp}°C).`;
                    
                    const existingAlert = activeAlerts.find(a => a.locationId === id);

                    if (!existingAlert) {
                        console.log(`\x1b[31mNEW ALERT DETECTED: ${alertMessage}\x1b[0m`);
                        activeAlerts.push({
                            id: id,
                            locationId: id,
                            locationName: name,
                            currentTemp: currentTemperature,
                            minTemp: minTemp,
                            maxTemp: maxTemp,
                            timestamp: new Date().toISOString()
                        });
                    }
                } else {
                    // Se a temperatura voltar ao normal, REMOVE o alerta.
                    const alertIndex = activeAlerts.findIndex(a => a.locationId === id);
                    if (alertIndex > -1) {
                        console.log(`\x1b[32mSITUATION NORMALIZED: The environment in '${name}' has returned to the safe range.\x1b[0m`);
                        activeAlerts.splice(alertIndex, 1);
                    }
                }
            }
        } catch (error) {
            console.error("Error in temperature monitor:", error);
        }
    }, 60000); // Executa a cada 1 minuto (60000 ms).
}

// Funções para as rotas da API gerenciarem os alertas na memória.
export function getAlerts() {
    return activeAlerts;
}

export function resolveAlert(alertId) {
    const alertIndex = activeAlerts.findIndex(a => a.id === Number(alertId));
    if (alertIndex > -1) {
        activeAlerts.splice(alertIndex, 1);
        return true;
    }
    return false;
}