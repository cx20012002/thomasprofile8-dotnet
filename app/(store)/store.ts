import { BasketItem, ProductWithQuantity } from "@/lib/types/productTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Basket Interface
interface BasketState {
  items: BasketItem[];
  addItem: (product: ProductWithQuantity) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateItem: (productId: number, basketItem: BasketItem) => void;
  removeItem: (productId: number) => void;
  deleteItem: (productId: number) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: number) => number;
  getGroupedItems: () => BasketItem[];
}

// Basket Modal Interface
interface BasketModalState {
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
}

// Basket Store
export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.product?.id === product?.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product?.id === product?.id ? { ...item, quantity: item.quantity + product.quantity } : item,
              ),
            };
          } else {
            return {
              items: [...state.items, { product, quantity: product.quantity }],
            };
          }
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.product?.id === productId ? { ...item, quantity } : item)),
        })),

      // update item with price, name
      updateItem: (productId, basketItem: BasketItem) =>
        set((state) => ({
          items: state.items.map((item) => (item.product?.id === productId ? { ...item, ...basketItem } : item)),
        })),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product?.id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        })),

      deleteItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product?.id !== productId),
        })),

      clearBasket: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.product?.price ?? 0) * item.quantity, 0);
      },

      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product?.id === productId);
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,
    }),
    { name: "basket-storage" },
  ),
);

// Basket Modal Store
export const useBasketModalStore = create<BasketModalState>()((set) => ({
  isCartOpen: false,
  setCartOpen: (isCartOpen) => set({ isCartOpen: isCartOpen }),
}));
