import { Promotion } from './promotion';
import { CartItem } from '../../cart/cart-item';

export abstract class ItemPromotion extends Promotion<CartItem> {}
