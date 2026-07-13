"use client";

import { Loader2, X, AlertTriangle } from "lucide-react";
import type { ShippingMethod } from "@/lib/api/shipping";
import { useDeleteShippingMethod } from "@/hooks/useShipping";

interface DeleteMethodModalProps {
  method: ShippingMethod | null;
  onClose: () => void;
}

export default function DeleteMethodModal({ method, onClose }: DeleteMethodModalProps) {
  const deleteMutation = useDeleteShippingMethod();
  const isPending = deleteMutation.isPending;

  const handleConfirm = () => {
    if (method) {
      deleteMutation.mutate(method.id, {
        onSuccess: () => onClose()
      });
    }
  };

  if (!method) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='bg-white rounded-xl w-full max-w-md overflow-hidden'>
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-full">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className='text-xl font-semibold text-gray-800'>Delete Shipping Method</h2>
          </div>
          <button onClick={onClose} className='p-2 hover:bg-gray-100 rounded-full text-gray-500'>
            <X className='w-5 h-5' />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 text-sm">
            Are you sure you want to delete the shipping method <span className="font-semibold">&quot;{method.name}&quot;</span>? This action cannot be undone. All associated rules will also be deleted.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-6 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-white hover:border-gray-300 transition-colors bg-transparent"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleConfirm} 
            disabled={isPending}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors disabled:opacity-50"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
