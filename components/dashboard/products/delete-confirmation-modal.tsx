'use client';

import { AlertTriangle, X } from 'lucide-react';
import React from 'react';

interface DeleteConfirmationModalProps {
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export default function DeleteConfirmationModal({
  productName,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteConfirmationModalProps) {
  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={!isDeleting ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className='relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200'>
        {/* Header */}
        <div className='flex items-center justify-between px-5 pt-5 pb-3'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-red-100'>
              <AlertTriangle className='w-5 h-5 text-red-600' />
            </div>
            <h2 className='text-lg font-semibold text-[#171717]'>Delete Product</h2>
          </div>
          <button
            type='button'
            onClick={onClose}
            disabled={isDeleting}
            className='p-2 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50'
          >
            <X className='w-5 h-5 text-gray-500' />
          </button>
        </div>

        {/* Body */}
        <div className='px-5 py-3'>
          <p className='text-sm text-gray-600 leading-relaxed'>
            Are you sure you want to delete{' '}
            <span className='font-semibold text-gray-900'>{productName}</span>? This action cannot
            be undone and will permanently remove this product and all its variants from our
            servers.
          </p>
        </div>

        {/* Footer */}
        <div className='px-5 py-5 mt-2 bg-gray-50 flex items-center justify-end gap-3 border-t border-gray-100'>
          <button
            type='button'
            onClick={onClose}
            disabled={isDeleting}
            className='h-10 px-5 rounded-lg border border-gray-200 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={isDeleting}
            className='h-10 px-5 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center min-w-25'
          >
            {isDeleting ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
