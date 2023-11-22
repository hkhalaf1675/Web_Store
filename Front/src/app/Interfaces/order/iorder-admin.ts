import { IproductOrderAdmin } from "./iproduct-order-admin";

export interface IorderAdmin {
    orderId: number;
    status: number;
    date: string;
    userName: string;
    address: string;
    totalPrice: number;
    products: IproductOrderAdmin[];
}
