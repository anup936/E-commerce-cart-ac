import { Promotion } from '../models/promotion/core/promotion';
import { PromotionFactory } from './promotion-factory';

const promotionRawData = [
    {
        type: 'MultiBuyFlatOffPromotion',
        promotionConfig: { productName: 'A', batchQuantity: 3, discount: 15 },
    },
    {
        type: 'MultiBuyFlatOffPromotion',
        promotionConfig: { productName: 'B', batchQuantity: 2, discount: 5 },
    },
    {
        type: 'CartValueFlatOffPromotion',
        promotionConfig: [
            {
                min: 150,
                discount: 20,
            },
        ],
    },
];

export const Promotions: Promotion<any>[] = promotionRawData
    .map((pRaw) => {
        return PromotionFactory.getPromotionFromRawData(pRaw);
    })
    .filter((p) => p);
