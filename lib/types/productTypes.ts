import { Product } from "@/app/admin/lib/types/product";
export type ProductWithQuantity = Product & {
  quantity: number;
};

export type BasketItem = {
  product: ProductWithQuantity;
  quantity: number;
};
