import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import { BasketItem } from "@/lib/types/productTypes";
import AddOrRemoveComponent from "./AddOrRemoveComponent";

interface CartItemProps {
  item: BasketItem;
  onDelete: (id: number) => void;
  onContinueShopping: (url: string) => void;
}

export default function CartItem({ item, onDelete, onContinueShopping }: CartItemProps) {
  return (
    <div className="flex items-center justify-between gap-8 py-5">
      <div
        onClick={() => onContinueShopping(`/product/${item.product.slug}`)}
        className="group aspect-square h-[70px] cursor-pointer overflow-hidden rounded-lg md:h-[110px] md:rounded-xl"
      >
        <Image
          src={item.product.pictureUrl || "/product-image.avif"}
          alt={item.product.name || "Product Image"}
          width={120}
          height={120}
          loading="eager"
          sizes="120px"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-125"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div
          onClick={() => onContinueShopping(`/product/${item.product.slug}`)}
          className="flex cursor-pointer items-center justify-between"
        >
          <h3 className="text-[1em] font-bold leading-[1em] md:text-[1.1em]">{item.product.name}</h3>
          <span className="text-[1em] font-bold md:text-[1.2em]">${(item.product.price / 100).toFixed(2)}</span>
        </div>
        <p className="hidden max-w-[280px] text-xs leading-[1.5em] text-purple-200 md:block">
          {item.product.shortDescription}
        </p>
        <div className="mt-1 flex items-center justify-between">
          <AddOrRemoveComponent item={item} />
          <button onClick={() => onDelete(item.product.id)} className="group">
            <FiTrash2
              size={16}
              className="text-secondary transition-all duration-300 group-hover:-rotate-12 group-hover:text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
} 