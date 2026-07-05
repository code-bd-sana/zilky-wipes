'use client';

import { useCartStore } from '@/store/useCartStore';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, clearCart, syncStock } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const { data: liveProducts, isSuccess: liveProductsSuccess } = useProducts({ limit: 100 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Layer 2: Sync stock and auto-adjust if needed
  useEffect(() => {
    if (open && liveProductsSuccess && liveProducts?.data) {
      const stockUpdates: { productVariantId: string; maxStock: number }[] = [];

      liveProducts.data.forEach((p: { variants?: { id: string; stock: number }[] }) => {
        p.variants?.forEach((v: { id: string; stock: number }) => {
          stockUpdates.push({ productVariantId: v.id, maxStock: v.stock });
        });
      });

      if (stockUpdates.length > 0) {
        const { adjusted } = syncStock(stockUpdates);
        if (adjusted) {
          toast.warning('Cart Updated', {
            description: 'Some items in your cart were adjusted due to limited stock.',
          });
        }
      }
    }
  }, [open, liveProductsSuccess, liveProducts, syncStock]);

  if (!open) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 z-100 backdrop-blur-[6px]'
      style={{ backgroundColor: 'var(--cart-overlay-bg)' }}
      onClick={onClose}
      role='presentation'
    >
      <aside
        className='ml-auto flex h-screen w-3/4 sm:w-[80vw] md:w-[60vw] lg:w-[40vw] flex-col p-5 md:p-8 text-white'
        style={{ backgroundColor: 'var(--cart-panel-bg)' }}
        onClick={(event) => event.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-label='Cart drawer'
      >
        <div className='flex items-center justify-between'>
          <h2 className='font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-none'>
            Cart List{' '}
            <span className='text-(--cart-muted-text)'>
              / {mounted ? items.length.toString().padStart(2, '0') : '00'}
            </span>
          </h2>
          <button
            type='button'
            onClick={clearCart}
            className='text-2xl sm:text-3xl md:text-5xl text-white transition-opacity hover:opacity-75'
          >
            Clear
          </button>
        </div>

        <div className='mt-8 md:mt-16 flex-1 overflow-y-auto pr-2'>
          {mounted && items.length === 0 ? (
            <p className='text-xl text-white/70 py-6'>Your cart is empty.</p>
          ) : (
            mounted &&
            items.map((item) => (
              <div
                key={`${item.productVariantId}-${item.isSubscription}`}
                className='border-t border-white/35 py-4 md:py-6'
              >
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <div className='relative h-16 w-16 md:h-20 md:w-20 rounded-md bg-white p-2'>
                      <Image src={item.image} alt={item.name} fill className='object-contain' />
                    </div>
                    <div>
                      <p className='text-lg sm:text-xl md:text-2xl'>{item.name}</p>
                      {item.variantName && (
                        <p className='text-sm text-white/70'>{item.variantName}</p>
                      )}
                    </div>
                  </div>
                  <div className='flex flex-col items-end gap-2'>
                    <p className='text-lg sm:text-xl md:text-2xl'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.productVariantId)}
                      className='text-white/50 hover:text-white transition-colors'
                    >
                      <Trash2 className='h-5 w-5' />
                    </button>
                  </div>
                </div>
                <div className='mt-3 md:mt-4 flex flex-wrap gap-2'>
                  <span className='inline-flex items-center gap-2 rounded-full border border-white px-2.5 py-1 text-xs sm:text-sm bg-white/10'>
                    {item.isSubscription ? 'Subscription' : 'One Time'}
                  </span>
                  <span className='inline-flex items-center gap-4 rounded-full border border-white px-3 py-1 text-xs sm:text-sm'>
                    <button
                      onClick={() => updateQuantity(item.productVariantId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className='disabled:opacity-50 hover:opacity-75 transition-opacity'
                    >
                      <Minus className='h-3.5 w-3.5' />
                    </button>
                    <span className='text-sm font-medium w-3 text-center'>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productVariantId, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                      className='hover:opacity-75 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <Plus className='h-3.5 w-3.5' />
                    </button>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='mt-auto pt-6 border-t border-white/35'>
          <div className='flex justify-between items-center mb-6 text-xl md:text-3xl font-medium'>
            <span>Subtotal</span>
            <span>
              $
              {mounted
                ? items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
                : '0.00'}
            </span>
          </div>
          <Link
            href='/checkout'
            onClick={onClose}
            className='inline-flex h-12 sm:h-14 w-full items-center justify-center rounded-full bg-white text-base sm:text-lg md:text-xl font-medium text-(--text-primary) transition hover:opacity-90'
          >
            Proceed to Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
