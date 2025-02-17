import mongoose from 'mongoose';
import { Product, IProduct } from '../models/product.model';
import { Logger } from '../utils/logger';

const logger = new Logger('initData');

export const initializeData = async () => {
    const products: Partial<IProduct>[] = [
        { name: 'Piece 1', description: 'Description for piece 1', price: 100 },
        { name: 'Piece 2', description: 'Description for piece 2', price: 200 },
        { name: 'Piece 3', description: 'Description for piece 3', price: 300 },
        { name: 'Piece 4', description: 'Description for piece 4', price: 400 },
        { name: 'Piece 5', description: 'Description for piece 5', price: 500 },
        { name: 'Piece 6', description: 'Description for piece 6', price: 600 },
        { name: 'Piece 7', description: 'Description for piece 7', price: 700 },
        { name: 'Piece 8', description: 'Description for piece 8', price: 800 },
        { name: 'Piece 9', description: 'Description for piece 9', price: 900 },
        { name: 'Piece 10', description: 'Description for piece 10', price: 1000 },
        { name: 'Piece 11', description: 'Description for piece 11', price: 1100 },
        { name: 'Piece 12', description: 'Description for piece 12', price: 1200 },
        { name: 'Piece 13', description: 'Description for piece 13', price: 1300 },
        { name: 'Piece 14', description: 'Description for piece 14', price: 1400 },
        { name: 'Piece 15', description: 'Description for piece 15', price: 1500 },
        { name: 'Piece 16', description: 'Description for piece 16', price: 1600 },
        { name: 'Piece 17', description: 'Description for piece 17', price: 1700 },
        { name: 'Piece 18', description: 'Description for piece 18', price: 1800 },
        { name: 'Piece 19', description: 'Description for piece 19', price: 1900 },
        { name: 'Piece 20', description: 'Description for piece 20', price: 2000 },
    ];

    try {
        await Product.insertMany(products);
        logger.info('Données initiales ajoutées avec succès');
        await mongoose.connection.collection('migrations').insertOne({ name: 'initializeData', appliedAt: new Date() });
    } catch (error) {
        logger.error('Erreur lors de l\'ajout des données initiales', error as Error);
    }
};