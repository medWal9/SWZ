import mongoose, { Mongoose } from 'mongoose';
import { config } from '../../config/config';
import { Logger } from '../utils/logger';
import { initializeData } from './initData';
import path from 'path';
import fs from 'fs';

// URI de MongoDB récupéré depuis les variables d'environnement ou avec une valeur par défaut pour le développement local
const mongoUri = config.get('database').uri;
const logger = new Logger('db connection');

const applyUpdates = async () => {
    const updatesDir = path.resolve(__dirname, 'updaters');
    const files = fs.readdirSync(updatesDir).filter(file => file.endsWith('.updater.ts'));
    
    if (files.length > 0) {
        
        for (const file of files) {
            logger.warn(`Applying update: ${file}`);
            const migration = await mongoose.connection.collection('migrations').findOne({ name: file });
            if (migration) {
                logger.info(`Update ${file} already applied`);
                continue;
            }

            const filePath = path.resolve(updatesDir, file);
            const updateModule = await import(filePath);
            if (updateModule && typeof updateModule.default === 'function') {
                logger.info(`Applying update: ${file}`);
                await updateModule.default();
                logger.info(`Update applied: ${file}`);
            }
        }
        
    } else {
        logger.info('No updates to apply');
    }
    
};


const connectToDatabase = async (): Promise<Mongoose> => {
    try {
        const db = await mongoose.connect(mongoUri);
        logger.info(`Connexion à MongoDB réussie sur ${mongoUri}`);
        // Appeler le script d'initialisation des données
        const initialized = await mongoose.connection.collection('migrations').findOne({ name: 'initializeData' })
        if (!initialized) {   
            await initializeData();
            logger.debug('Données initialisées');
        }   
        await applyUpdates();
        return db;
    } catch (error) {
        logger.error(`Erreur de connexion à MongoDB sur ${mongoUri}`, error as Error);
        process.exit(1); // Quitte l'application si la connexion échoue
    }
};

export const db = connectToDatabase();
