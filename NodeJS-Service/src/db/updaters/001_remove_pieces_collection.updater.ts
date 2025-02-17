import mongoose, { Mongoose } from 'mongoose';
import { dropCollection } from '../utils/dbUtils';
import { Logger } from '../../utils/logger';

const logger = new Logger('001_remove_pieces_collection');

const Remove_pieces_collection = async () => {
    logger.info('deleting collection pieces...');
    await dropCollection('pieces');
    await mongoose.connection.collection('migrations').insertOne({ name: '001_remove_pieces_collection.updater.ts' });
    logger.info('collection pieces deleted');

};

export default Remove_pieces_collection;