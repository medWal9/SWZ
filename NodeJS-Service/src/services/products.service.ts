import { Product } from "../models/product.model";
import { Logger } from "../utils/logger";

const logger = new Logger('products.service');

class ProductService {
    async getProducts() {
        const products = await Product.find();
        logger.info(`Found ${products.length} products`);
        return products;
    }

    async getProductById(id: string) {
        const product = await Product.findById(id);
        if (!product) {
            logger.warn(`Product with id ${id} not found`);
        } else {
            logger.info(`Found product with id ${id}`);
        }
        return product;
    }
}

export const productService = new ProductService();