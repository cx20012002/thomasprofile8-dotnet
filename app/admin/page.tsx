"use client";

import { deleteProduct, getProducts } from "@/app/admin/lib/actions/productActions";
import React, { useEffect } from "react";
import { Product } from "./lib/types/product";
import Link from "next/link";
import Image from "next/image";
export default function Page() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const {products} = await getProducts();
      if (products) setProducts(products);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const removeProduct = async (id: number) => {
    try {
      const res = await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 shadow-lg">
        <div className="relative z-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h1 className="text-3xl font-bold text-white">Products Management</h1>
          <Link
            href="/admin/products/new"
            className="group relative overflow-hidden rounded-lg bg-white/10 px-6 py-2.5 text-center text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Product
            </span>
          </Link>
        </div>
        {/* Optional decorative elements */}
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
      </div>

      {products.length === 0 ? (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4 px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-800">No products found</h1>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white shadow-md">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products.map((product: Product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{product.id}</td>
                  <td className="px-6 py-4">
                    <Image src={product.pictureUrl} alt={product.name} width={100} height={100} className="rounded-lg w-[100px] aspect-square object-cover" />
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">${(product.price / 100).toFixed(2)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <button className="mr-2 rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700">
                      Edit
                    </button>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="rounded-lg bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
