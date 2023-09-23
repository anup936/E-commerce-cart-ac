import { CartPromotion } from '../core/cart-promotion';
import { ShoppingCart } from '../../cart/shopping-cart';

interface Rule {
    min: number;
    discount: number;
}

export class CartValueFlatOffPromotion extends CartPromotion {
    private rules: Rule[] = [];
    constructor(rule: any[]) {
        super();
        this.rules = rule
            .map((r) => {
                return {
                    min: r.min,
                    discount: r.discount,
                };
            })
            .sort((a, b) => {
                return b.min - a.min;
            });
    }

    public apply(cart: ShoppingCart): number {
        let total = cart.postDiscountTotal;
        let rule = this.rules.find((r) => r.min <= total);
        if (rule) {
            return rule.discount;
        } else {
            return 0.0;
        }
    }
}
