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
  maxStock: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productVariantId: string) => void;
  updateQuantity: (productVariantId: string, quantity: number, currentMaxStock?: number) => void;
  syncStock: (stockUpdates: { productVariantId: string; maxStock: number }[]) => { adjusted: boolean };
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  shippingMethod: { methodId: string; name: string; cost: number } | null;
  setShippingMethod: (method: { methodId: string; name: string; cost: number } | null) => void;
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
            const existing = newItems[existingItemIndex];
            const newQuantity = existing.quantity + (item.quantity || 1);
            
            // Ensure we don't exceed stock
            existing.quantity = Math.min(newQuantity, item.maxStock);
            existing.maxStock = item.maxStock; // Update to latest known stock
            
            return { items: newItems };
          }

          const initialQuantity = Math.min(item.quantity || 1, item.maxStock);
          return { items: [...state.items, { ...item, quantity: initialQuantity }] };
        });
      },
      removeItem: (productVariantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productVariantId !== productVariantId),
        }));
      },
      updateQuantity: (productVariantId, quantity, currentMaxStock) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.productVariantId === productVariantId) {
              const stockLimit = currentMaxStock !== undefined ? currentMaxStock : i.maxStock;
              return { 
                ...i, 
                quantity: Math.min(Math.max(1, quantity), stockLimit),
                maxStock: stockLimit
              };
            }
            return i;
          }),
        }));
      },
      syncStock: (stockUpdates) => {
        let adjusted = false;
        set((state) => {
          const newItems = state.items.map((i) => {
            const update = stockUpdates.find(s => s.productVariantId === i.productVariantId);
            if (update) {
              const newQuantity = Math.min(i.quantity, update.maxStock);
              if (newQuantity < i.quantity) {
                adjusted = true;
              }
              return {
                ...i,
                quantity: Math.max(1, newQuantity), // if stock is 0, we should technically remove it, but keeping it at 1 or letting UI handle it. Actually, if stock is 0, quantity becomes 0.
                maxStock: update.maxStock
              };
            }
            return i;
          });
          // Remove items that dropped to 0 stock
          const filteredItems = newItems.filter(i => i.maxStock > 0);
          if (filteredItems.length !== state.items.length) adjusted = true;
          return { items: filteredItems };
        });
        return { adjusted };
      },
      clearCart: () => set({ items: [], appliedCoupon: null }),
      appliedCoupon: null,
      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
      removeCoupon: () => set({ appliedCoupon: null }),
      shippingMethod: null,
      setShippingMethod: (method) => set({ shippingMethod: method }),
    }),
    {
      name: 'zilky-cart-storage',
    }
  )
);
