'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGetOrderById } from '@/hooks/useOrders';
import CarrierInformation from "@/components/account/track-order/carrier-info";
import DeliveryDetails from "@/components/account/track-order/delivery-details";
import DeliveryTrack from "@/components/account/track-order/delivery-track";
import TrackTitle from "@/components/account/track-order/track-title";
import { Loader2 } from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { data: orderResponse, isLoading } = useGetOrderById(id);
  const order = orderResponse?.data;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!order) {
    return (
      <>
        <TrackTitle />
        <div className="text-center my-12 text-[#979191]">Order not found.</div>
      </>
    );
  }

  return (
    <>
      <TrackTitle />
      <DeliveryTrack order={order} />
      <DeliveryDetails order={order} />
      <CarrierInformation order={order} />
    </>
  );
}

export default function TrackOrder() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
