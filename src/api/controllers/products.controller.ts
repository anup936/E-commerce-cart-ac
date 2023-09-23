import { Request, Response } from 'express';
import * as productRepo from '../../data/product-repository';

export const index = (_req: Request, res: Response) => {
    res.json(productRepo.getAll());
};
