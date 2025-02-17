import { Request, Response } from 'express';
import { productService } from '../services/products.service';
import { Logger } from '../utils/logger';

const logger = new Logger('products.controller');

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error) {
        logger.error('Error getting products', error as Error);
        res.status(500).json({ message: 'Error getting products' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (error) {
        logger.error(`Error getting product with id ${req.params.id}`, error as Error);
        res.status(500).json({ message: 'Error getting product' });
    }
};