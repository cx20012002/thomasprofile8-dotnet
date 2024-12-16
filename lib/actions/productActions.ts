"use server";

import { client } from "@/sanity/lib/client";
import { FOOD_CATEGORY_QUERY, FOOD_ITEMS_BY_CATEGORY_QUERY } from "@/sanity/lib/products/foodQueries";
import {
  ALL_PRODUCTS_QUERY,
  ALL_PRODUCTS_QUERY_WITH_CATEGORY,
  SEARCH_QUERY,
  SINGLE_PRODUCT_QUERY,
  TOTAL_PRODUCTS_COUNT_QUERY,
  TOTAL_PRODUCTS_COUNT_WITH_CATEGORY_QUERY,
} from "@/sanity/lib/products/productsQueries";

// get all products
export const getAllProducts = async (start: number = 0, end: number = 6, catname: string = "") => {
  const query = catname === "" ? ALL_PRODUCTS_QUERY : ALL_PRODUCTS_QUERY_WITH_CATEGORY;
  try {
    const [products, totalCount] = await Promise.all([
      client.fetch(
        query,
        { start, end, catname },
        {
          cache: "force-cache",
          next: { revalidate: 300 },
        },
      ),
      client.fetch(
        catname === "" ? TOTAL_PRODUCTS_COUNT_QUERY : TOTAL_PRODUCTS_COUNT_WITH_CATEGORY_QUERY,
        { catname },
        {
          cache: "force-cache",
          next: { revalidate: 300 },
        },
      ),
    ]);
    return {
      products: products || [],
      total: totalCount,
    };
  } catch (error) {
    console.error(error);
    return [];
  }
};

// get single product with cache
export const getSingleProductWithCache = async (slug: string) => {
  const product = await client.fetch(
    SINGLE_PRODUCT_QUERY,
    { slug },
    {
      cache: "force-cache",
      next: { revalidate: 300 },
    },
  );
  return product || null;
};

// get single product
export const getSingleProduct = async (slug: string) => {
  const product = await client.fetch(SINGLE_PRODUCT_QUERY, { slug });
  return product || null;
};

// get the food category
export const getFoodCategory = async () => {
  const category = await client.fetch(
    FOOD_CATEGORY_QUERY,
    {},
    {
      cache: "force-cache",
      next: { revalidate: 300 },
    },
  );
  return category || null;
};

// get food items by category
export const getFoodItemsByCategory = async (foodCategory: string) => {
  const items = await client.fetch(
    FOOD_ITEMS_BY_CATEGORY_QUERY,
    { foodCategory },
    {
      cache: "force-cache",
      next: { revalidate: 300 },
    },
  );
  return items || null;
};

// search products
export const searchProducts = async (searchQuery: string) => {
  const products = await client.fetch(SEARCH_QUERY, { searchQuery: `*${searchQuery}*` });
  return products || null;
};
