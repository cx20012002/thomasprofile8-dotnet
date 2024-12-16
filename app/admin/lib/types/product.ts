interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  pictureUrl: string;
  stock: number;
  categories: Category[];
}

interface OrderProductDto {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  pictureUrl: string;
}

interface CreateProductDto {
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  stock: number;
  pictureUrl: string;
  categoryIds: number[];
}

export type { Product, Category, CreateProductDto, OrderProductDto };
