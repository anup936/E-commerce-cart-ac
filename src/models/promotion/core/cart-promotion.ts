import { Promotion } from './promotion';
import { ShoppingCart } from '../../cart/shopping-cart';

export abstract class CartPromotion extends Promotion<ShoppingCart> {}
