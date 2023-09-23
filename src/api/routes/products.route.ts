import { Router } from 'express';
import { index } from '../controllers/products.controller';

export const ProductsRouter = Router();

ProductsRouter.get('/', index);
