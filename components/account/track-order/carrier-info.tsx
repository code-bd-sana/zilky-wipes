import { BackendOrder } from "@/lib/api/orders";

export default function CarrierInformation({ order }: { order: BackendOrder }) {
  const carrierData = [
    {
      title: "Carrier",
      stat: order.shippingCarrier || "TBD",
    },
    {
      title: "Tracking Number",
      stat: order.trackingNumber || "Pending",
    },
    {
      title: "Service ",
      stat: order.shippingMethodName || "Standard",
    },
  ];
  return (
    <section className='mx-8 md:mx-20 lg:mx-40 xl:mx-70 2xl:mx-150 my-6 md:my-12'>
      <div>
        <div className='mt-8 md:mt-12'>
          <p className='text-[#979191]'>Carrier Information</p>
          <div className='my-4'>
            {carrierData.map((item, index) => (
              <div
                key={index}
                className={`mb-4 flex justify-between items-center ${
                  index === carrierData.length - 1
                    ? ""
                    : "border-b border-[#E5E5E5]"
                } pb-2`}>
                <p className='text-[#979191] text-sm '>{item.title}</p>
                <p className='text-[#474747] text-sm '>{item.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
