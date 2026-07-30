'use client';

import { useCreateCoupon, useUpdateCoupon } from '@/hooks/useCoupons';
import type { Coupon } from '@/lib/api/coupons';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type CouponFormValues = {
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  isActive: boolean;
  usageLimit?: number;
};

type CouponFormModalProps = {
  open: boolean;
  onClose: () => void;
  couponToEdit?: Coupon | null;
};

export default function CouponFormModal({ open, onClose, couponToEdit }: CouponFormModalProps) {
  const createCoupon = useCreateCoupon(onClose);
  const updateCoupon = useUpdateCoupon(onClose);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponFormValues>({
    defaultValues: {
      code: '',
      discountType: 'PERCENTAGE',
      discountValue: 0,
      isActive: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (couponToEdit) {
        reset({
          code: couponToEdit.code,
          discountType: couponToEdit.discountType,
          discountValue: couponToEdit.discountValue,
          minOrderValue: couponToEdit.minOrderValue || undefined,
          maxDiscount: couponToEdit.maxDiscount || undefined,
          isActive: couponToEdit.isActive,
          usageLimit: couponToEdit.usageLimit || undefined,
        });
      } else {
        reset({
          code: '',
          discountType: 'PERCENTAGE',
          discountValue: 0,
          minOrderValue: undefined,
          maxDiscount: undefined,
          isActive: true,
          usageLimit: undefined,
        });
      }
    }
  }, [open, couponToEdit, reset]);

  if (!open) return null;

  const onSubmit = (data: CouponFormValues) => {
    const payload = {
      ...data,
      discountValue: Number(data.discountValue),
      minOrderValue: data.minOrderValue ? Number(data.minOrderValue) : undefined,
      maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : undefined,
      usageLimit: data.usageLimit ? Number(data.usageLimit) : undefined,
    };

    if (couponToEdit) {
      updateCoupon.mutate({ id: couponToEdit.id, data: payload });
    } else {
      createCoupon.mutate(payload);
    }
  };

  const isPending = createCoupon.isPending || updateCoupon.isPending;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {couponToEdit ? 'Edit Coupon' : 'Create Coupon'}
          </h2>
          <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full text-gray-500'>
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Coupon Code *</label>
              <input
                {...register('code', { required: 'Code is required' })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20'
                placeholder='e.g. SUMMER20'
                disabled={!!couponToEdit}
              />
              {errors.code && <p className='text-red-500 text-sm mt-1'>{errors.code.message}</p>}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Discount Type *
                </label>
                <select
                  {...register('discountType')}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20'
                >
                  <option value='PERCENTAGE'>Percentage (%)</option>
                  <option value='FIXED_AMOUNT'>Fixed Amount ($)</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Value *</label>
                <input
                  type='number'
                  step='0.01'
                  {...register('discountValue', { required: 'Value is required', min: 0 })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Min Order Value ($)
                </label>
                <input
                  type='number'
                  step='0.01'
                  {...register('minOrderValue')}
                  placeholder='Optional'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Max Discount ($)
                </label>
                <input
                  type='number'
                  step='0.01'
                  {...register('maxDiscount')}
                  placeholder='Optional'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Usage Limit</label>
                <input
                  type='number'
                  {...register('usageLimit')}
                  placeholder='Optional (Total uses)'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20'
                />
              </div>
            </div>

            <div className='flex items-center gap-3 py-2'>
              <input
                type='checkbox'
                id='isActive'
                {...register('isActive')}
                className='w-5 h-5 accent-primary rounded border-gray-300'
              />
              <label htmlFor='isActive' className='text-gray-700 font-medium cursor-pointer'>
                Coupon is Active
              </label>
            </div>
          </div>

          <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition'
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-6 py-2 rounded-lg bg-(--text-primary) text-white hover:opacity-90 transition disabled:opacity-50'
              disabled={isPending}
            >
              {isPending ? 'Saving...' : 'Save Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
