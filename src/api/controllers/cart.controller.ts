import { Request, Response } from 'express';
import * as productRepo from '../../data/product-repository';
import { Promotions } from '../../data/promotion-repository';
import { ShoppingCart } from '../../models/cart/shopping-cart';

const cart = new ShoppingCart(Promotions);
export const index = (_req: Request, res: Response) => {
    res.json(cart.transform());
};

export const addProductToCart = (req: Request, res: Response) => {
    let product = productRepo.findOne(req.params.productName);
    if (!product) {
        res.sendStatus(404);
        return;
    }
    cart.addItemToCart(product);
    res.json(cart.transform());
};

export const emptyCart = (_req: Request, res: Response) => {
    cart.clearCart();
    res.json(cart.transform());
};
