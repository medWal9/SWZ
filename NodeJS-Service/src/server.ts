import express from 'express';
import { config } from '../config/config';
import { Logger } from './utils/logger';
import { db } from './db/mongoDB';
import productRoutes from './routes/products.routes';

const app = express();
const serverConfig = config.get('server');
const env = config.get('environment');
const logger = new Logger('serverConfig');

app.get('/', (req, res) => {
    res.send('Express + TypeScript serverConfig');
});

app.use('/api/products', productRoutes);

// start serverConfig after connecting on bd
db.then(() => {
    const server = app.listen(serverConfig.port, () => {
        logger.info(`serverConfig started with ${env} environment on \
${/*env === 'local'? 'http': 'https'*/ 'http'}://${serverConfig.host}:${serverConfig.port}`);
        //logger.info('This is an info message');
        //logger.error('This is an error message');
        //logger.warn('This is a warning message');
        //logger.debug('This is a debug message');
    });
    // Gérer la déconnexion de MongoDB à la fermeture de l'application
    const gracefulShutdown = async () => {
        logger.info('Arrêt du serveur...');
        try {
            (await db).disconnect(); // Utiliser mongoose pour déconnecter
            logger.info('Déconnexion de MongoDB réussie');
        } catch (error) {
            logger.error('Erreur lors de la déconnexion de MongoDB', error as Error);
        } finally {
            server.close(() => {
                logger.info('Processus terminé.');
                process.exit(0);
            });
        }
    };

    // Écouter les signaux de terminaison pour effectuer une déconnexion propre
    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
});
