"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FiShoppingCart } from "react-icons/fi";
import { useBasketModalStore, useBasketStore } from "../(store)/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getSingleProduct } from "@/lib/actions/productActions";
import { BasketItem } from "@/lib/types/productTypes";
import CartItem from "./CartItem";
import { useSession } from "next-auth/react";
import { createCheckoutSession, MetaData } from "@/lib/actions/createCheckoutSession";
import { toast } from "react-toastify";
import { getProductBySlug } from "../admin/lib/actions/productActions";

export default function CartComponent({ dark }: { dark?: boolean }) {
  const { items, deleteItem, getTotalPrice, updateItem } = useBasketStore();
  const { isCartOpen, setCartOpen } = useBasketModalStore();
  const router = useRouter();
  const hasCheckedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  // use authjs to check if the user is logged in
  const { data: session, status } = useSession();
  const { email, name, id } = session?.user || {};
  const isLoggedIn = !!session;

  const handleContinueShopping = (url: string) => {
    setCartOpen(false);
    router.push(url);
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to checkout");
      return;
    }
    setIsLoading(true);
    try {
      const metaData: MetaData = {
        orderNumber: crypto.randomUUID(),
        customerName: name || "",
        customerEmail: email || "",
        providerId: id || "",
      };

      const checkoutUrl = await createCheckoutSession(items, metaData);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isCartOpen && !hasCheckedRef.current) {
      hasCheckedRef.current = true;
      Promise.all(
        items.map(async (item) => {
          try {
            const dbProduct = await getProductBySlug(item.product.slug);

            if (!dbProduct) {
              // Remove item if product no longer exists
              deleteItem(item.product.id);
              return;
            }

            // Only update if price or other details have changed
            if (dbProduct.price !== item.product.price || dbProduct.name !== item.product.name) {
              const dbBasketItem = {
                product: dbProduct,
                quantity: item.quantity,
              } as BasketItem;

              updateItem(item.product.id, dbBasketItem);
            }
          } catch (error) {
            console.error(`Error updating cart item: ${error}`);
          }
        }),
      );
    }
  }, [isCartOpen]);

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger
        className={`group relative ml-5 flex h-full cursor-pointer md:items-center ${dark ? "text-white" : "text-textDark"}`}
      >
        <div
          className={`absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full ${
            dark ? "bg-secondary" : "bg-primary"
          } text-[9px] font-bold ${dark ? "text-textDark" : "text-white"}`}
        >
          {items.length}
        </div>
        <FiShoppingCart
          size={22}
          className={`transition-colors duration-300 focus:outline-none ${dark ? "group-hover:text-secondary" : "group-hover:text-primary"}`}
        />
      </SheetTrigger>
      <SheetContent className="flex w-[90%] !max-w-full flex-col justify-between gap-10 border-none bg-gradient-to-b from-primary to-purple-900 text-white md:!max-w-[600px] md:p-10">
        <SheetHeader className="text-left">
          <SheetTitle className="text-3xl tracking-[-0.04em] text-white">Shopping Cart</SheetTitle>
          <SheetDescription className="text-sm text-white/80">{items.length} items in your cart</SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col">
              {items.map((item, index) => (
                <CartItem key={index} item={item} onDelete={deleteItem} onContinueShopping={handleContinueShopping} />
              ))}
            </div>
          </div>

          {/* Checkout Section */}
          <div className="mt-4 space-y-4 border-t border-purple-500 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[1.2em] font-semibold">
                <span>Subtotal</span>
                <span>${(getTotalPrice() / 100).toFixed(2)}</span>
              </div>
              <p className="text-sm text-coffeePink">Shipping and taxes are calculated at checkout</p>
            </div>

            <button
              className={`w-full rounded-md py-3 text-lg font-bold transition-colors duration-300 ${isLoading ? "bg-gray-400 text-gray-600" : "hover:bg-secondary/90 bg-secondary text-primary hover:bg-green-400"}`}
              disabled={isLoading}
              onClick={handleCheckout}
            >
              {isLoading ? "Submitting..." : "Checkout"}
            </button>

            <button className="hover:text-coffeePink/90 w-full py-3 text-sm text-coffeePink">
              OR{" "}
              <span onClick={() => setCartOpen(false)} className="font-bold text-white underline">
                Continue Shopping
              </span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
