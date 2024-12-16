import Image from "next/image";
import { PiTruckLight, PiCoffee } from "react-icons/pi";
import Link from "next/link";
import AddToCartSection from "./AddToCartSection";
import { Product } from "@/app/admin/lib/types/product";

export default function TopDetailsComponent({ product }: { product: Product }) {
  if (!product) return null;

  return (
    <div className="mt-20 flex w-full flex-col gap-4 overflow-hidden">
      <div className="flex w-full flex-1 flex-col justify-between gap-4 overflow-hidden xl:flex-row">
        {/* Left side - Product Image */}
        <div className="h-full min-h-[400px] flex-1 overflow-hidden rounded-3xl bg-white p-[24px] md:p-10">
          <Image
            src={product?.pictureUrl || "/product-image.avif"}
            alt="Kozmo Coffee Bag"
            width={1024}
            height={914}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side - Product Info */}
        <div className="flex w-full flex-col gap-7 rounded-3xl bg-white p-[24px] text-sm text-gray-500/90 md:p-10 xl:w-[450px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[20px] font-bold text-textDark md:text-[34px]">{product?.name}</h1>
            <div className="text-sm">
              {product.categories?.map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.slug}`}
                  className="transition-colors duration-300 hover:text-primary"
                >
                  {category.name}
                  {index !== (product.categories?.length ?? 0) - 1 ? ", " : ""}
                </Link>
              ))}
            </div>
            <p className="text-lg font-medium text-textDark">${(product?.price / 100).toFixed(2)}</p>
          </div>

          <div className="w-full text-sm leading-6 md:w-[90%] lg:w-full">{product?.description}</div>

          {/* Features */}
          <div className="flex flex-col gap-5">
            <p className="flex items-center gap-2">
              <PiTruckLight size={20} />
              Same day delivery
            </p>
            <p className="flex items-center gap-2">
              <PiCoffee size={20} />
              Quantity checked
            </p>
          </div>

          <AddToCartSection product={product} />
        </div>
      </div>
    </div>
  );
}
