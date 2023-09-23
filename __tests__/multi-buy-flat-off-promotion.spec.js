const { Product } = require('../build/models/product');
const { ShoppingCart } = require('../build/models/cart/shopping-cart');
const { CartItem } = require('../build/models/cart/cart-item');
const {
    MultiBuyFlatOffPromotion,
} = require('../build/models/promotion/impl/multi-buy-flat-off-promotion');

describe('Multi buy flat off promotion', () => {
    let promotion = new MultiBuyFlatOffPromotion({
        productName: 'A',
        batchQuantity: 3,
        discount: 15,
    });
    test('it should not apply promotion', () => {
        let cartitem = new CartItem('A', 30, 2);
        let discount = promotion.apply(cartitem);
        expect(discount).toEqual(0);
    });
    test('it should apply promotion 1 batch for 3 items', () => {
        let cartitem = new CartItem('A', 30, 3);
        let discount = promotion.apply(cartitem);
        expect(discount).toEqual(15);
    });
    test('it should apply promotion 1 batch for 5 items', () => {
        let cartitem = new CartItem('A', 30, 5);
        let discount = promotion.apply(cartitem);
        expect(discount).toEqual(15);
    });
    test('it should apply promotion 2 batch for 6 items', () => {
        let cartitem = new CartItem('A', 30, 6);
        let discount = promotion.apply(cartitem);
        expect(discount).toEqual(30);
    });
    test('it should apply promotion 2 batch for 7 items', () => {
        let cartitem = new CartItem('A', 30, 7);
        let discount = promotion.apply(cartitem);
        expect(discount).toEqual(30);
    });
});
