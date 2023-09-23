import { Product } from '../models/product';

const products: Product[] = [
    new Product('A', 30),
    new Product('B', 20),
    new Product('C', 50),
    new Product('D', 15),
];

export const getAll = () => {
    return products;
};

export const findOne = (productName: string) => {
    return products.find((p) => p.name === productName);
};
