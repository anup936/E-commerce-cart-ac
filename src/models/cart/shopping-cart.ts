import { CartItem } from './cart-item';
import { Product } from '../product';
import { Promotion } from '../promotion/core/promotion';
import { CartPromotion } from '../promotion/core/cart-promotion';
import { ItemPromotion } from '../promotion/core/item-promotion';

export class ShoppingCart {
    private items: Map<string, CartItem> = new Map();
    // private _discount: number = 0.0;
    private _promotions: Promotion<any>[] = [];
    private _cartDiscount: number = 0.0;
    private _itemDiscounts: Map<string, number> = new Map();

    constructor(promotions: Promotion<any>[]) {
        this._promotions = promotions || [];
    }

    public get discount(): number {
        let discount = this._cartDiscount;
        this._itemDiscounts.forEach((productDiscount) => {
            discount += productDiscount;
        });
        return discount;
    }

    public get preDiscountTotal(): number {
        return this.getItems()
            .map((ci) => ci.itemTotal)
            .reduce((ac, it) => ac + it, 0.0);
    }

    public get postDiscountTotal(): number {
        return this.preDiscountTotal - this.discount;
    }
    private getItems(): CartItem[] {
        return Array.from(this.items.values());
    }

    addItemToCart(product: Product, quantity: number = 1) {
        let cartItem: CartItem = this.items.get(product.name);
        if (!cartItem) {
            cartItem = new CartItem(product.name, product.unitPrice, quantity);
        } else {
            cartItem.setQuantity(cartItem.quantity + quantity);
        }
        this.items.set(product.name, cartItem);
        this.runPromotions();
    }
    removeItemFromCart(product: Product, quantity: number = 1) {
        let cartItem: CartItem = this.items.get(product.name);
        if (cartItem) {
            cartItem.setQuantity(Math.max(cartItem.quantity - quantity, 0));
        }
        this.items.set(product.name, cartItem);
        this.runPromotions();
    }

    clearCart() {
        this.items.clear();
        this._cartDiscount = 0.0;
        this._itemDiscounts.clear();
    }

    transform() {
        return {
            items: this.getItems().map((ci) => {
                const transformed = ci.transform();
                return {
                    ...transformed,
                    totalDiscount: this._itemDiscounts.get(ci.productName),
                };
            }),
            cartDiscount: this._cartDiscount,
            totalDiscount: this.discount,
            preDiscountTotal: this.preDiscountTotal,
            postDiscountTotal: this.postDiscountTotal,
        };
    }

    private runPromotions() {
        this._cartDiscount = 0.0;
        this._itemDiscounts.clear();
        let cartPromotions: CartPromotion[] = [];
        let itemPromotions: ItemPromotion[] = [];

        this._promotions.forEach((promotion) => {
            if (promotion instanceof ItemPromotion) {
                itemPromotions.push(promotion);
            } else if (promotion instanceof CartPromotion) {
                cartPromotions.push(promotion);
            }
        });

        if (itemPromotions.length > 0) {
            this.getItems().forEach((item) => {
                this._itemDiscounts.set(
                    item.productName,
                    Math.max(
                        ...itemPromotions.map((p) => {
                            return p.apply(item);
                        }),
                    ),
                );
            });
        }

        if (cartPromotions.length) {
            this._cartDiscount = Math.max(
                ...cartPromotions.map((p) => {
                    return p.apply(this);
                }),
            );
        }
    }
}
