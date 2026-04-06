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
    <aside className='flex h-full flex-col bg-(--checkout-panel-bg) px-4 py-5 sm:px-6 sm:py-6 md:px-8 lg:px-10'>
      <h2 className='font-heading text-4xl text-(--text-primary) sm:text-5xl'>
        Items
      </h2>

      <div className='mt-3 border-t border-(--checkout-divider)'>
        {checkoutItems.map((item) => (
          <div
            key={item.id}
            className='flex items-start justify-between gap-4 border-b border-(--checkout-divider) py-3 sm:py-4'>
            <div className='flex items-start gap-3'>
              <div className='relative h-10 w-6 sm:h-12 sm:w-7'>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes='48px'
                  className='object-contain'
                />
              </div>
              <div>
                <p className='text-sm leading-snug text-(--text-primary) sm:text-base'>
                  {item.name}
                </p>
                <p className='mt-1 text-sm text-(--checkout-muted-text)'>
                  {item.quantity}x
                </p>
              </div>
            </div>

            <p className='text-sm text-(--text-primary) sm:text-base'>
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <form className='mt-6 flex items-center gap-2'>
        <input
          type='text'
          placeholder='Discount Code'
          className='h-10 flex-1 rounded-sm border border-transparent bg-white px-3 text-sm text-(--text-primary) placeholder:text-(--checkout-muted-text) focus:outline-none focus:ring-1 focus:ring-(--text-primary)'
        />
        <button
          type='button'
          className='h-10 rounded-sm bg-(--text-primary) px-5 text-sm font-medium text-white'>
          Apply
        </button>
      </form>

      <div className='mt-auto pt-12 sm:pt-20'>
        <dl className='space-y-2.5 text-sm sm:text-base'>
          <div className='flex items-center justify-between text-(--checkout-muted-text)'>
            <dt>Subtotal · 1 Item</dt>
            <dd>$20.00</dd>
          </div>
          <div className='flex items-center justify-between text-(--checkout-muted-text)'>
            <dt>Shipping</dt>
            <dd>Delivery</dd>
          </div>
          <div className='flex items-center justify-between text-(--checkout-muted-text)'>
            <dt>Subscription</dt>
            <dd>Bi - Monthly</dd>
          </div>
          <div className='flex items-center justify-between text-(--checkout-muted-text)'>
            <dt>Discount</dt>
            <dd>$ - 10</dd>
          </div>
        </dl>

        <div className='mt-3 border-t border-(--checkout-divider) pt-3'>
          <div className='flex items-center justify-between'>
            <p className='text-lg text-(--checkout-muted-text) sm:text-xl'>Total</p>
            <p className='font-heading text-4xl text-(--text-primary) sm:text-5xl'>
              $30.00
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
