import db from '../models/index.js';

// Lista de alertas ativos, guardada apenas na memória do servidor.
let activeAlerts = [];

// Função que simula a temperatura ambiente de um local, com anomalias ocasionais.
function simulateAmbientTemperature(local) {
    // A temperatura base será o ponto médio da faixa de segurança do local.
    const baseTemp = (local.temperaturaMaxima + local.temperaturaMinima) / 2;
    // Variação normal e pequena, para simular um sistema de climatização a funcionar.
    let variation = (Math.random() - 0.5) * 1.5;

    // 15% de chance de gerar uma anomalia (ex: falha no aquecedor, porta aberta).
    if (Math.random() < 0.15) {
        console.log(`[SIMULADOR]: Gerando anomalia de temperatura para '${local.nome}'...`);
        // Gera uma falha drástica de 8 a 15 graus para cima ou para baixo.
        const faultVariation = (Math.random() > 0.5 ? 1 : -1) * (8 + Math.random() * 7);
        variation = faultVariation;
    }

    return parseFloat((baseTemp + variation).toFixed(2));
}

export function startTemperatureMonitor() {
    console.log('🌡️  Monitor de Ambiente da Colónia iniciado. A verificar a cada 1 minuto...');

    setInterval(async () => {
        try {
            const locais = await db.Local.findAll();
            if (!locais.length) {
                console.log('[MONITOR]: Nenhum local encontrado na base de dados. Adicione locais habitáveis para iniciar o monitoramento.');
                return;
            }

            for (const local of locais) {
                // 1. Simula e guarda a nova temperatura no banco de dados.
                const temperaturaAtual = simulateAmbientTemperature(local);
                await db.LogTemperatura.create({
                    temperatura: temperaturaAtual,
                    localId: local.id
                });

                // 2. ANALISA a temperatura gerada contra a faixa de segurança do PRÓPRIO local.
                const { temperaturaMinima, temperaturaMaxima } = local;

                // 3. Se estiver fora da faixa, GERA um alerta.
                if (temperaturaAtual < temperaturaMinima || temperaturaAtual > temperaturaMaxima) {
                    const alertMessage = `ALERTA DE AMBIENTE em '${local.nome}': Temp. de ${temperaturaAtual}°C fora da faixa segura (${temperaturaMinima}°C a ${temperaturaMaxima}°C).`;
                    
                    const existingAlert = activeAlerts.find(a => a.localId === local.id);

                    if (!existingAlert) {
                        console.log(`\x1b[31mNOVO ALERTA DETETADO: ${alertMessage}\x1b[0m`);
                        activeAlerts.push({
                            id: local.id, // O ID do local serve como ID do alerta
                            localId: local.id,
                            localName: local.nome,
                            currentTemp: temperaturaAtual,
                            minTemp: temperaturaMinima,
                            maxTemp: temperaturaMaxima,
                            timestamp: new Date().toISOString()
                        });
                    }
                } else {
                    // 4. Se a temperatura voltou ao normal, REMOVE o alerta.
                    const alertIndex = activeAlerts.findIndex(a => a.localId === local.id);
                    if (alertIndex > -1) {
                        console.log(`\x1b[32mSITUAÇÃO NORMALIZADA: O ambiente em '${local.nome}' voltou à faixa de segurança.\x1b[0m`);
                        activeAlerts.splice(alertIndex, 1);
                    }
                }
            }
        } catch (error) {
            console.error("Erro no monitor de temperatura:", error);
        }
    }, 60000); // Executa a cada 1 minuto (60000 ms).
}

// Funções para as rotas da API gerirem os alertas em memória.
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