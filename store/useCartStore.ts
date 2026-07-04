import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Coupon } from '../lib/api/coupons';

export type CartItem = {
  productId: string;
  productVariantId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantName?: string;
  isSubscription?: boolean;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productVariantId: string) => void;
  updateQuantity: (productVariantId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.productVariantId === item.productVariantId && i.isSubscription === item.isSubscription
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity || 1;
            return { items: newItems };
          }

          return { items: [...state.items, { ...item, quantity: item.quantity || 1 }] };
        });
      },
      removeItem: (productVariantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productVariantId !== productVariantId),
        }));
      },
      updateQuantity: (productVariantId, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productVariantId === productVariantId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },
      clearCart: () => set({ items: [], appliedCoupon: null }),
      appliedCoupon: null,
      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),
    }),
    {
      name: 'zilky-cart-storage',
    }
  )
);
