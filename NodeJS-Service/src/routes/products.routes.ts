import { Router } from 'express';
import { getAllProducts, getProductById } from '../controllers/products.controller';

const router = Router();

// Define the routes for products
router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;