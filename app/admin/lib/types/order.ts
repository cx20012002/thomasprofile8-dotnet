import { OrderProductDto } from "./product";

export type Order = {
  orderNumber: string;
  userAuthId: string;
  customerName: string;
  customerEmail: string;
  status: string;
  totalPrice: number;
  products: OrderProductDto[];
};
