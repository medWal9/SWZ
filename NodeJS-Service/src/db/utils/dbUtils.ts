import mongoose from 'mongoose';
import { Logger } from '../../utils/logger';

const logger = new Logger('dbUtils');

export const createCollection = async (collectionName: string) => {
    try {
        await mongoose.connection.createCollection(collectionName);
        logger.info(`Collection ${collectionName} created successfully.`);
    } catch (error) {
        logger.error(`Erreur lors de la création de la collection ${collectionName}`, error as Error);
    }
};

export const dropCollection = async (collectionName: string) => {
    try {
        const collection = mongoose.connection.collection(collectionName);
        if (collection.length > 0) {
            await collection.drop();
            logger.info(`Collection ${collectionName} supprimée avec succès.`);
        } else {
            logger.warn(`La collection ${collectionName} n'existe pas.`);
        }
        
    } catch (error) {
        logger.error(`Erreur lors de la suppression de la collection ${collectionName}`, error as Error);
    }
};