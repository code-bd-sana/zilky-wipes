import Image from "next/image";

type CheckoutItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  imageAlt: string;
};

const checkoutItems: CheckoutItem[] = [
  {
    id: "1",
    name: "NatureSoft Wipes\u2122",
    quantity: 1,
    price: 20,
    image: "/home/wipe.png",
    imageAlt: "NatureSoft Wipes",
  },
  {
    id: "2",
    name: "NatureSoft Wipes\u2122",
    quantity: 1,
    price: 20,
    image: "/home/wipe.png",
    imageAlt: "NatureSoft Wipes",
  },
];

export default function CheckoutRightPanel() {
  return (
    <aside className='flex flex-col bg-(--checkout-panel-bg) py-8 pl-8 pr-12.5 lg:h-full'>
      <h2 className='font-heading text-xl text-(--text-primary) md:text-3xl pb-8'>
        Items
      </h2>

      <div className='border-t border-(--checkout-divider)'>
        {checkoutItems.map((item) => (
          <div
            key={item.id}
            className='flex items-start justify-between border-b border-(--checkout-divider) py-6'>
            <div className='flex items-start gap-6'>
              <div className='relative h-10 w-10 md:h-16 md:w-16'>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes='64px'
                  className='object-contain'
                />
              </div>
              <div>
                <p className='text-sm leading-snug text-(--checkout-muted-text) md:text-2xl'>
                  {item.name}
                </p>
                <p className=' mt-2 text-sm md:text-2xl text-(--checkbox-muted-subtext)'>
                  {item.quantity}x
                </p>
              </div>
            </div>

            <p className='text-sm text-(--checkout-muted-text) md:text-2xl'>
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <form className='mt-6 py-6 flex items-center gap-2'>
        <input
          type='text'
          placeholder='Discount Code'
          className='text-base flex-1 rounded-[6px] border border-transparent bg-white p-3 text-(--checkbox-muted-text) focus:outline-none focus:ring-1 focus:ring-(--text-primary)'
        />
        <button
          type='button'
          className='rounded-[6px] bg-(--text-primary) px-6 py-3 text-base font-medium text-white'>
          Apply
        </button>
      </form>

      <div className='mt-auto'>
        <dl className='space-y-4 text-base md:text-2xl pb-6'>
          <div className='flex items-center justify-between'>
            <dt className="text-(--checkbox-muted-subtext)">Subtotal · 1 Item</dt>
            <dd className="text-(--checkout-muted-text)">$20.00</dd>
          </div>
          <div className='flex items-center justify-between'>
            <dt className="text-(--checkbox-muted-subtext)">Shipping</dt>
            <dd className="text-(--checkout-muted-text)">Delivery</dd>
          </div>
          <div className='flex items-center justify-between'>
            <dt className="text-(--checkbox-muted-subtext)">Subscription</dt>
            <dd className="text-(--checkout-muted-text)">Bi - Monthly</dd>
          </div>
          <div className='flex items-center justify-between'>
            <dt className="text-(--checkbox-muted-subtext)">Discount</dt>
            <dd className="text-(--checkout-muted-text)">$ - 10</dd>
          </div>
        </dl>

        <div className='border-t border-(--checkout-divider) pt-6'>
          <div className='flex items-center justify-between'>
            <p className='text-lg text-(--checkbox-muted-subtext) md:text-2xl'>Total</p>
            <p className='font-heading text-xl text-(--checkout-muted-text) md:text-3xl'>
              $30.00
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
