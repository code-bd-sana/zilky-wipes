import { BackendOrder } from "@/lib/api/orders";
import { format } from "date-fns";
import { XCircle } from "lucide-react";

export default function DeliveryTrack({ order }: { order: BackendOrder }) {
  const getSteps = () => {
    if (order.status === 'CANCELLED') {
      return [
        {
          date: format(new Date(order.updatedAt), "MMM dd, yyyy · hh:mm a"),
          label: "Order Cancelled",
          sub: "Your order has been cancelled",
          done: true,
          icon: <XCircle size={16} className="text-red-500" />
        }
      ];
    }

    const isProcessing = ['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status);
    const isShipped = ['SHIPPED', 'DELIVERED'].includes(order.status);
    const isDelivered = order.status === 'DELIVERED';

    return [
      {
        date: format(new Date(order.createdAt), "MMM dd, yyyy · hh:mm a"),
        label: "Order placed",
        sub: "We have received your order",
        done: true,
      },
      {
        date: isProcessing ? "In Progress" : "Pending",
        label: "Processing",
        sub: "Preparing your order",
        done: isProcessing,
      },
      {
        date: isShipped ? "Shipped" : "Waiting",
        label: "In transit",
        sub: "Handed over to carrier",
        done: isShipped,
      },
      {
        date: isDelivered ? format(new Date(order.updatedAt), "MMM dd, yyyy · hh:mm a") : "Expected soon",
        label: "Delivered",
        sub: "Delivered to your address",
        done: isDelivered,
      }
    ];
  };

  const steps = getSteps();
  
  const getStatusColor = () => {
    switch (order.status) {
      case 'DELIVERED': return 'bg-green-600';
      case 'CANCELLED': return 'bg-red-600';
      case 'SHIPPED': return 'bg-blue-600';
      default: return 'bg-yellow-500';
    }
  };
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 my-6 md:my-12'>
      <div className='mb-6'>
        <p className='text-[#979191]'>Order Tracking</p>
        <p className='text-(--text-primary) text-3xl font-heading font-semibold'>
          {order.orderNumber}
        </p>
      </div>

      <div className='bg-white rounded-2xl border border-neutral-200 px-7 py-6'>
        {/* Status badge */}
        <div className='inline-flex items-center gap-2 border border-neutral-200 rounded-full px-4 py-1.5 mb-7'>
          <span className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          <span className='text-sm text-(--text-primary) capitalize'>
            {order.status.toLowerCase()}
          </span>
        </div>

        {/* Timeline */}
        <div className='relative pl-7'>
          {/* Vertical line */}
          <div className='absolute left-1.5 top-2.5 bottom-2.5 w-px'>
            <div className='h-[78%] bg-[#474747]' />
            <div className='h-[22%] bg-neutral-300' />
          </div>

          {steps.map((step, i) => (
            <div key={i} className='relative mb-8 last:mb-0'>
              {/* Dot */}
              <div
                className={`absolute -left-7 top-0.75 w-3.25 h-3.25 rounded-full border
                  ${
                    step.done
                      ? "bg-(--text-primary) border-(--text-primary)"
                      : "bg-white border-neutral-400"
                  }`}
              />
              <p
                className={`text-[12.5px] mb-0.5 ${step.done ? "text-[#979191]" : "text-neutral-400"}`}>
                {step.date}
              </p>
              <p
                className={`text-[15px]  mb-0.5 ${step.done ? "text-[#474747]" : "text-neutral-400"}`}>
                {step.label}
              </p>
              <p
                className={`text-[13px] ${step.done ? "text-[#979191]" : "text-neutral-400"}`}>
                {step.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
