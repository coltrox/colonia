import app from './app.js';
import db from './models/index.js';
import { startTemperatureMonitor } from './scheduler/temperatureScheduler.js';
// import { startScheduler as startStatusScheduler } from './scheduler/statusScheduler.js'; // LINHA REMOVIDA
// import { seedModules } from './models/Module.js'; // LINHA REMOVIDA

const PORT = process.env.PORT || 3000;

const seedDatabase = async () => {
    try {
        // Seeding para Locations 
        const locationCount = await db.Location.count();
        if (locationCount === 0) {
            console.log('No habitable locations found. Seeding initial data...');
            await db.Location.bulkCreate([
                { name: 'Central Hub', description: 'Main social and control area' },
                { name: 'Residential Block Alpha', description: 'Living quarters for crew' },
            ]);
            console.log('✅ Initial habitable locations created.');
        } else {
            console.log('Database already contains habitable locations.');
        }

        // Seeding para Storage Locations
        const storageLocationCount = await db.StorageLocation.count();
        if (storageLocationCount === 0) {
            console.log('No storage locations found. Seeding initial data...');
            await db.StorageLocation.bulkCreate([
                { name: 'Cold Storage Unit A-1', description: 'Freezer for perishable goods', temperatureMin: -25.0, temperatureMax: -15.0 },
                { name: 'Dry Pantry B-3', description: 'Storage for non-perishable foods', temperatureMin: 10.0, temperatureMax: 25.0 },
            ]);
            console.log('✅ Initial storage locations created.');
        } else {
            console.log('Database already contains storage locations.');
        }

    } catch (error) {
        console.error('CRITICAL ERROR: Failed to seed database:', error);
    }
};

console.log('Starting the server and syncing with the database...');

db.sequelize.sync({ alter: true })
  .then(async () => {
    console.log('✅ Database and tables synced successfully.');
    
    await seedDatabase(); 
    
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port http://localhost:${PORT}`);
        startTemperatureMonitor();
        // startStatusScheduler(); // LINHA REMOVIDA
    });
  })
  .catch(err => {
    console.error('CRITICAL ERROR: Could not sync with the database.');
    console.error(err.message);
  });