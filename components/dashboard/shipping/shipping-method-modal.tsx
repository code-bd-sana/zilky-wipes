 
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useCreateShippingMethod, useUpdateShippingMethod } from '@/hooks/useShipping';
import type {
  CreateShippingMethodDto,
  ShippingMethod,
  UpdateShippingMethodDto,
} from '@/lib/api/shipping';
import { Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ShippingMethodModalProps {
  open: boolean;
  onClose: () => void;
  methodToEdit?: ShippingMethod | null;
}

export default function ShippingMethodModal({
  open,
  onClose,
  methodToEdit,
}: ShippingMethodModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState('');
  const [isActive, setIsActive] = useState(true);

  const createMutation = useCreateShippingMethod();
  const updateMutation = useUpdateShippingMethod();

  const isEditing = !!methodToEdit;
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (methodToEdit) {
      setName(methodToEdit.name || "");
      setDescription(methodToEdit.description || "");
      setEstimatedDeliveryTime(methodToEdit.estimatedDeliveryTime || "");
      setIsActive(methodToEdit.isActive);
    } else {
      setName("");
      setDescription("");
      setEstimatedDeliveryTime("");
      setIsActive(true);
    }
  }, [methodToEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (isEditing && methodToEdit) {
      const payload: UpdateShippingMethodDto = {
        name,
        description,
        estimatedDeliveryTime,
        isActive,
      };
      updateMutation.mutate({ id: methodToEdit.id, data: payload }, { onSuccess: () => onClose() });
    } else {
      const payload: CreateShippingMethodDto = {
        name,
        description,
        estimatedDeliveryTime,
        isActive,
      };
      createMutation.mutate(payload, { onSuccess: () => onClose() });
    }
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {isEditing ? 'Edit Shipping Method' : 'Add Shipping Method'}
          </h2>
          <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full text-gray-500'>
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='name' className='text-sm font-medium text-gray-700'>
              Name *
            </label>
            <input
              id='name'
              placeholder='e.g. Standard Shipping'
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7BB5A3] focus:border-transparent outline-none'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='description' className='text-sm font-medium text-gray-700'>
              Description
            </label>
            <input
              id='description'
              placeholder='e.g. Reliable and cost-effective'
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7BB5A3] focus:border-transparent outline-none'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor='estimatedDeliveryTime' className='text-sm font-medium text-gray-700'>
              Estimated Delivery Time
            </label>
            <input
              id='estimatedDeliveryTime'
              placeholder='e.g. 3-5 business days'
              value={estimatedDeliveryTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEstimatedDeliveryTime(e.target.value)
              }
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7BB5A3] focus:border-transparent outline-none'
            />
          </div>

          <div className='flex items-center space-x-2 pt-2'>
            <input
              type='checkbox'
              id='isActive'
              checked={isActive}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsActive(e.target.checked)}
              className='w-4 h-4 text-[#7BB5A3] border-gray-300 rounded focus:ring-[#7BB5A3]'
            />
            <label htmlFor='isActive' className='text-sm font-medium text-gray-700'>
              Active (Available for checkout)
            </label>
          </div>

          <div className='flex justify-end gap-3 pt-6 border-t border-gray-100'>
            <button
              type='button'
              onClick={onClose}
              disabled={isPending}
              className='px-6 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isPending || !name}
              className='flex items-center gap-2 px-6 py-2 rounded-lg bg-[#7BB5A3] hover:bg-[#68a08f] text-white font-medium transition-colors disabled:opacity-50'
            >
              {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
              {isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
