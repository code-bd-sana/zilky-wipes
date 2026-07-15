'use client';

import { useState } from 'react';
import {
  ChevronsRight,
  DollarSign,
  MapPin,
  Maximize2,
  PackageCheck,
  RotateCcw,
  Truck,
  UserRound,
  Wallet,
  X,
  Trash2,
  type LucideIcon,
  Package,
} from 'lucide-react';
import type { BackendOrder } from '@/lib/api/orders';
import { useUpdateOrderStatus, useUpdateOrderTracking } from '@/hooks/useOrders';
import Image from 'next/image';
import DeleteOrderModal from './delete-order-modal';

type OrderDetailPanelProps = {
  order: BackendOrder | null;
  onClose: () => void;
};

type InfoRowKey =
  | 'customer'
  | 'email'
  | 'phone'
  | 'address'
  | 'itemCount'
  | 'subtotal'
  | 'shipping'
  | 'total';

const INFO_ROWS: { label: string; key: InfoRowKey; icon: LucideIcon }[] = [
  { label: 'Client Name', key: 'customer', icon: UserRound },
  { label: 'Phone', key: 'phone', icon: RotateCcw },
  { label: 'Address', key: 'address', icon: MapPin },
  { label: 'Items Count', key: 'itemCount', icon: PackageCheck },
  { label: 'Subtotal', key: 'subtotal', icon: DollarSign },
  { label: 'Shipping Cost', key: 'shipping', icon: Truck },
  { label: 'Total Paid', key: 'total', icon: Wallet },
];

const ORDER_STATUSES: BackendOrder['status'][] = [
  'PENDING',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

export default function OrderDetail({ order, onClose }: OrderDetailPanelProps) {
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber || '');
  const updateStatus = useUpdateOrderStatus();
  const updateTracking = useUpdateOrderTracking();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!order) return null;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStatus.mutate({ id: order.id, status: e.target.value as BackendOrder['status'] });
  };

  const handleSaveTracking = () => {
    updateTracking.mutate({ id: order.id, trackingNumber });
  };

  const handleDeleteOrder = () => {
    setIsDeleteModalOpen(true);
  };

  const getRowValue = (key: InfoRowKey): string => {
    switch (key) {
      case 'customer':
        return `${order.shippingFirstName} ${order.shippingLastName}`;
      case 'phone':
        return order.shippingPhone || 'N/A';
      case 'address':
        return `${order.shippingStreetAddress}, ${order.shippingCity}, ${order.shippingState} ${order.shippingPostalCode}, ${order.shippingCountry}`;
      case 'itemCount':
        return `${order.items.reduce((acc, item) => acc + item.quantity, 0)} items`;
      case 'subtotal':
        return `$${order.subtotal.toFixed(2)}`;
      case 'shipping':
        return `$${order.shippingCost.toFixed(2)}`;
      case 'total':
        return `$${order.total.toFixed(2)}`;
      default:
        return '';
    }
  };

  return (
    <section className='fixed inset-0 z-50 flex justify-end p-3' onClick={onClose}>
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />

      <div
        className='relative z-10 w-full max-w-md bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#E5E5E5]'>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400'
            >
              <ChevronsRight className='w-4 h-4' color='#262626' />
            </button>
            <button
              type='button'
              onClick={onClose}
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400'
            >
              <Maximize2 className='w-3 h-3' color='#262626' />
            </button>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400'
          >
            <X className='w-4 h-4' />
          </button>
        </div>

        <div className='flex items-start justify-between px-5 py-4 border-b border-[#F0F0F0]'>
          <h2 className='text-[28px] leading-none font-light text-[#2B2D2E]'>
            {order.orderNumber}
          </h2>
          <span className='text-sm text-gray-500 mt-2'>
            {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>

        <div className='mx-5 mt-4 mb-4 rounded-xl border border-[#E8E8E8] bg-[#FBFAF9] p-4 flex flex-col gap-4'>
          <div>
            <label className='block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider'>
              Update Order Status
            </label>
            <select
              value={order.status}
              onChange={handleStatusChange}
              disabled={updateStatus.isPending}
              className='w-full h-10 px-3 rounded-md border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-(--text-primary)'
            >
              {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider'>
              Tracking Number
            </label>
            <div className='flex gap-2'>
              <input
                type='text'
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder='Enter tracking ID...'
                className='flex-1 h-10 px-3 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-(--text-primary)'
              />
              <button
                onClick={handleSaveTracking}
                disabled={
                  updateTracking.isPending || trackingNumber === (order.trackingNumber || '')
                }
                className='px-4 bg-(--text-primary) text-white text-sm font-medium rounded-md hover:bg-black/90 disabled:opacity-50'
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div className='mx-5 mb-3 divide-y divide-[#F3F3F3]'>
          <div className='py-3'>
            <h3 className='text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2'>
              <Package className='w-4 h-4 text-gray-500' /> Ordered Items
            </h3>
            <div className='flex flex-col gap-3'>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className='flex gap-3 items-center bg-gray-50 p-2 rounded-lg border border-gray-100'
                >
                  <div className='w-12 h-12 relative bg-white border border-gray-200 rounded-md overflow-hidden shrink-0'>
                    {item.productVariant?.product.images?.[0] ? (
                      <Image
                        src={item.productVariant.product.images[0]}
                        alt={item.productVariant.name}
                        fill
                        className='object-cover'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                        <Package className='w-5 h-5 text-gray-400' />
                      </div>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-900 truncate'>
                      {item.productVariant?.product.name}
                    </p>
                    <p className='text-xs text-gray-500 truncate'>{item.productVariant?.name}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-medium text-gray-900'>${item.price.toFixed(2)}</p>
                    <p className='text-xs text-gray-500'>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {INFO_ROWS.map(({ label, key, icon: Icon }) => (
            <div key={key} className='flex items-center justify-between py-3'>
              <span className='inline-flex items-center gap-2 text-sm text-[#6E6E6E]'>
                <Icon className='h-3.5 w-3.5' color='#A6A6A6' />
                {label}
              </span>
              <span className='text-sm font-medium text-[#3E3E3E] max-w-[60%] text-right'>
                {getRowValue(key)}
              </span>
            </div>
          ))}
        </div>
        
        <div className='px-5 py-4 mt-auto border-t border-[#E5E5E5] bg-gray-50'>
          <button
            onClick={handleDeleteOrder}
            className='flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 hover:border-red-300 transition-colors'
          >
            <Trash2 className='w-4 h-4' />
            Delete Order
          </button>
        </div>
      </div>

      <DeleteOrderModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccessCallback={onClose}
        order={order}
      />
    </section>
  );
}
