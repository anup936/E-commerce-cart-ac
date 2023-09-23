const { Product } = require('../build/models/product');
const { ShoppingCart } = require('../build/models/cart/shopping-cart');
const { CartItem } = require('../build/models/cart/cart-item');
const {
    MultiBuyFlatOffPromotion,
} = require('../build/models/promotion/impl/multi-buy-flat-off-promotion');
const {
    CartValueFlatOffPromotion,
} = require('../build/models/promotion/impl/cart-value-flat-off-promotion');

describe('Auto calculate promotion on cart', () => {
    const promotions = [
        new MultiBuyFlatOffPromotion({
            productName: 'A',
            batchQuantity: 3,
            discount: 15,
        }),
        new MultiBuyFlatOffPromotion({
            productName: 'B',
            batchQuantity: 2,
            discount: 5,
        }),
        new CartValueFlatOffPromotion([
            {
                min: 150,
                discount: 20,
            },
        ]),
    ];

    const productA = new Product('A', 30);
    const productB = new Product('B', 20);
    const productC = new Product('C', 50);
    const productD = new Product('D', 15);

    let cart = new ShoppingCart(promotions);

    test('it should not apply any promotion', () => {
        cart.addItemToCart(productA);
        cart.addItemToCart(productB);
        cart.addItemToCart(productC);
        expect(cart.postDiscountTotal).toEqual(100);
        cart.clearCart();
    });
    test('Case 2', () => {
        cart.addItemToCart(productB);
        cart.addItemToCart(productA);
        cart.addItemToCart(productB);
        cart.addItemToCart(productA);
        cart.addItemToCart(productA);
        expect(cart.postDiscountTotal).toEqual(110);
        cart.clearCart();
    });
    test('Case 3', () => {
        cart.addItemToCart(productC);
        cart.addItemToCart(productB);
        cart.addItemToCart(productA);
        cart.addItemToCart(productA);
        cart.addItemToCart(productD);
        cart.addItemToCart(productA);
        cart.addItemToCart(productB);
        expect(cart.postDiscountTotal).toEqual(155);
        cart.clearCart();
    });
    test('Case 4', () => {
        cart.addItemToCart(productC);
        cart.addItemToCart(productA);
        cart.addItemToCart(productD);
        cart.addItemToCart(productA);
        cart.addItemToCart(productA);
        expect(cart.postDiscountTotal).toEqual(140);
        cart.clearCart();
    });
});
