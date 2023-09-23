import { Router } from 'express';
import {
    index,
    addProductToCart,
    emptyCart,
} from '../controllers/cart.controller';

export const CartRouter = Router();

CartRouter.get('/', index);
CartRouter.get('/add/:productName', addProductToCart);
CartRouter.get('/empty', emptyCart);
