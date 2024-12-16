"use server";

import { Category, CreateProductDto, Product } from "@/app/admin/lib/types/product";

// Get products
export const getProducts = async (pageNumber?: number, pageSize?: number, category?: string, searchTerm?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOTNET_API_URL + "/products";
  const params = new URLSearchParams();
  if (pageNumber) params.append("pageNumber", pageNumber.toString());
  if (pageSize) params.append("pageSize", pageSize.toString());
  if (category) params.append("category", category);
  if (searchTerm) params.append("searchTerm", searchTerm.toLowerCase());

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  const response = await fetch(url);
  // get header
  const headers = response.headers;

  const pagination = JSON.parse(headers.get("pagination") || "{}");

  const products: Product[] = await response.json();

  return { products, totalCount: pagination.totalCount };
};

// Get a product by slug
export const getProductBySlug = async (slug: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOTNET_API_URL + "/products/" + slug;
  const response = await fetch(baseUrl);
  const product: Product = await response.json();
  return product;
};

//get categories
export const getCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_DOTNET_API_URL + "/products/categories";
  const response = await fetch(baseUrl);
  const categories: Category[] = await response.json();
  return categories;
};

export const createProduct = async (product: CreateProductDto) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOTNET_API_URL + "/products";
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`Error creating product: ${response.statusText}`);
  }

  return await response.json();
};

export const deleteProduct = async (id: number) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOTNET_API_URL + "/products/" + id;
  const response = await fetch(baseUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error deleting product: ${response.statusText}`);
  }

  return { success: true, message: "Product deleted successfully" };
};
