import { MultiBuyFlatOffPromotion } from '../models/promotion/impl/multi-buy-flat-off-promotion';
import { CartValueFlatOffPromotion } from '../models/promotion/impl/cart-value-flat-off-promotion';

export class PromotionFactory {
    public static getPromotionFromRawData(rawData: any) {
        switch (rawData.type) {
            case 'MultiBuyFlatOffPromotion':
                return new MultiBuyFlatOffPromotion(rawData.promotionConfig);
            case 'CartValueFlatOffPromotion':
                return new CartValueFlatOffPromotion(rawData.promotionConfig);
            default:
                console.log('Unknown Promotion Type', rawData);
                return null;
        }
    }
}
