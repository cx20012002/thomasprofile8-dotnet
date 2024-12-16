"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Category, CreateProductDto } from "@/app/admin/lib/types/product";
import { createProduct, getCategories } from "@/app/admin/lib/actions/productActions";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<CreateProductDto>();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setValue(
      "categoryIds",
      selectedCategories.map((c) => c.id),
    );
  }, [selectedCategories, setValue]);

  const toggleCategory = React.useCallback((category: Category) => {
    setSelectedCategories((prev) =>
      prev.find((c) => c.id === category.id) ? prev.filter((c) => c.id !== category.id) : [...prev, category],
    );
  }, []);

  const handleImageUpload = React.useCallback(
    (result: any) => {
      if (result.event === "success" && result.info) {
        setValue("pictureUrl", result.info.secure_url);
      }
      return result;
    },
    [setValue],
  );

  const onSubmit = async (data: CreateProductDto) => {
    const formattedData = {
      ...data,
      price: Math.round(Number(Number(data.price).toFixed(2)) * 100), // This will handle 2 decimal places only
      stock: Math.round(Number(data.stock)),
    };
    try {
      const response = await createProduct(formattedData);
      router.push("/admin/");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        <Link href="/admin" className="rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600">
          Back to Products
        </Link>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-semibold text-gray-700">
                Product Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("name")}
              />
            </div>

            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-semibold text-gray-700">
                Price ($)
              </label>
              <input
                id="price"
                type="number"
                step="0.001"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("price")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="shortDescription" className="mb-1 block text-sm font-semibold text-gray-700">
              Short Description
            </label>
            <input
              id="shortDescription"
              type="text"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("shortDescription")}
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-semibold text-gray-700">
              Full Description
            </label>
            <textarea
              rows={6}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Stock */}
            <div>
              <label htmlFor="stock" className="mb-1 block text-sm font-semibold text-gray-700">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                min="0"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                {...register("stock")}
              />
            </div>

            {/* Categories */}
            <div>
              <label htmlFor="categories" className="mb-1 block text-sm font-semibold text-gray-700">
                Categories
              </label>
              <div className="mt-1">
                <button
                  type="button"
                  className="relative w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-left shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedCategories.length === 0
                    ? "Select categories..."
                    : selectedCategories.map((c) => c.name).join(", ")}
                </button>

                {isOpen && (
                  <div className="absolute z-10 mt-1 max-h-60 w-full max-w-[380px] overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center px-4 py-3 transition-colors hover:bg-gray-50">
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={selectedCategories.some((c) => c.name === category.name)}
                          onChange={() => toggleCategory(category)}
                          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`category-${category.id}`} className="ml-3 block text-sm text-gray-700">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input type="hidden" {...register("categoryIds")} />
            </div>
          </div>

          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{
              thumbnails: ".thumbnail-container",
              thumbnailTransformation: [{ width: 200, height: 200, crop: "fill" }],
            }}
            onSuccess={handleImageUpload}
          >
            {({ open }) => {
              return (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
                >
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>
          <div className="thumbnail-container"></div>
          <input type="hidden" {...register("pictureUrl")} />

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600 md:w-auto"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
