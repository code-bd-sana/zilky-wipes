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
    image: "/ZilkyWipes/p.png",
    imageAlt: "NatureSoft Wipes",
  },
  {
    id: "2",
    name: "NatureSoft Wipes\u2122",
    quantity: 1,
    price: 20,
    image: "/ZilkyWipes/p2.png",
    imageAlt: "NatureSoft Wipes",
  },
];

export default function CheckoutRightPanel() {
  return (
    <aside className='flex flex-col bg-(--checkout-panel-bg) px-4 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:h-full lg:pl-8 lg:pr-12.5'>
      <h2 className='pb-6 font-heading text-xl text-(--text-primary) md:text-2xl lg:pb-8 lg:text-3xl'>
        Items
      </h2>

      <div className='border-t border-(--checkout-divider)'>
        {checkoutItems.map((item) => (
          <div
            key={item.id}
            className='flex items-start justify-between border-b border-(--checkout-divider) py-4 sm:py-5 md:py-6'>
            <div className='flex items-start gap-3 sm:gap-4 md:gap-6'>
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
                <p className='text-sm leading-snug text-(--checkout-muted-text) sm:text-base md:text-xl lg:text-2xl'>
                  {item.name}
                </p>
                <p className='mt-2 text-sm text-(--checkbox-muted-subtext) sm:text-base md:text-xl lg:text-2xl'>
                  {item.quantity}x
                </p>
              </div>
            </div>

            <p className='text-sm text-(--checkout-muted-text) sm:text-base md:text-xl lg:text-2xl'>
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <form className='mt-4 flex flex-col gap-2 py-5 sm:mt-6 sm:flex-row sm:items-center sm:py-6'>
        <input
          type='text'
          placeholder='Discount Code'
          className='w-full flex-1 rounded-[6px] border border-transparent bg-white p-3 text-base text-(--checkbox-muted-text) focus:outline-none focus:ring-1 focus:ring-(--text-primary)'
        />
        <button
          type='button'
          className='w-full rounded-[6px] bg-(--text-primary) px-6 py-3 text-base font-medium text-white sm:w-auto'>
          Apply
        </button>
      </form>

      <div className='mt-auto'>
        <dl className='space-y-4 pb-6 text-base md:text-xl lg:text-2xl'>
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
            <p className='text-lg text-(--checkbox-muted-subtext) md:text-xl lg:text-2xl'>Total</p>
            <p className='font-heading text-xl text-(--checkout-muted-text) md:text-2xl lg:text-3xl'>
              $30.00
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
