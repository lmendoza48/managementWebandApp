import { ProductsBuy } from './products-buy';

export class Orders {
    $key: string;
    name: string;
    dni: string;
    address: string;
    email: string;
    order: number;
    productsBuy: ProductsBuy[];
    totalPay: number;
    status: string;
}
