import { BackendOrder } from "@/lib/api/orders";
import { format } from "date-fns";

export default function DeliveryDetails({ order }: { order: BackendOrder }) {
  const isSubscription = order.items.some(
    (item) => item.productVariant?.subscriptionEligible
  );

  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 my-6 md:my-12'>
      <div className='mt-6 md:mt-12'>
        <div className='mt-8'>
          <p className='text-[#979191]'>Delivery Address</p>
          <div className='my-4'>
            <p className='text-[#474747] text-sm'>{order.shippingStreetAddress}</p>
            <p className='text-[#474747] text-sm'>
              {order.shippingCity}, {order.shippingState} {order.shippingPostalCode}
            </p>
          </div>
        </div>
        <div className='mt-8'>
          <p className='text-[#979191]'>Order Date</p>
          <div className='my-4'>
            <p className='text-[#474747] text-sm'>
              {format(new Date(order.createdAt), "MMMM dd, yyyy")}
            </p>
            <p className='text-[#474747] text-sm'>
              {format(new Date(order.createdAt), "hh:mm a 'EST'")}
            </p>
          </div>
        </div>
        <div className='mt-8'>
          <p className='text-[#979191]'>Order Contents</p>
          <div className='my-4'>
            {order.items.map((item) => (
              <p key={item.id} className='text-[#474747] text-sm mb-1'>
                {item.quantity}x {item.productVariant?.product?.name} ({item.productVariant?.name})
              </p>
            ))}
            <p className='text-[#474747] text-sm mt-2 opacity-80'>
              {isSubscription ? 'Subscription delivery' : 'One-time delivery'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
