import { CartItem } from '../../cart/cart-item';
import { ItemPromotion } from '../core/item-promotion';

export class MultiBuyFlatOffPromotion extends ItemPromotion {
    private _productName: string;
    private _batchQuantity: number;
    private _discount: number;
    constructor(rule: any) {
        super();
        this._batchQuantity = rule.batchQuantity;
        this._productName = rule.productName;
        this._discount = rule.discount;
    }

    public apply(cartItem: CartItem) {
        if (this._productName != cartItem.productName) return 0.0;
        const quantity = cartItem.quantity;
        const totalBatches = Math.floor(quantity / this._batchQuantity);
        const ruleDiscount = totalBatches * this._discount;
        return ruleDiscount;
    }
}
