import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { ProductsRouter } from './routes/products.route';
import { CartRouter } from './routes/cart.route';

export const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));

app.use('/api/products', ProductsRouter);
app.use('/api/cart', CartRouter);
