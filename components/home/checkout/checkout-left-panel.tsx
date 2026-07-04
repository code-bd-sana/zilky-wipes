'use client';

import { useCreateOrder } from '@/hooks/useOrders';
import { useCartStore } from '@/store/useCartStore';
import { Search, Store, Truck } from 'lucide-react';
import { useId } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

type DeliveryMethod = 'ship' | 'pickup';

type CheckoutFormValues = {
  deliveryMethod: DeliveryMethod;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
};

const inputBaseClass =
  'w-full rounded-[8px] border border-(--checkout-divider) bg-white px-3 py-4 text-base text-(--checkout-muted-text) placeholder:text-(--checkbox-muted-subtext) focus:border-(--text-primary) focus:outline-none';

export default function CheckoutLeftPanel() {
  const { items } = useCartStore();
  const createOrder = useCreateOrder();
  const { register, control, handleSubmit } = useForm<CheckoutFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      deliveryMethod: 'ship',
      country: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
    },
  });
  const deliveryMethod = useWatch({ control, name: 'deliveryMethod' });

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = 10;
    const total = Math.max(0, subtotal - discount);

    const orderPayload = {
      items: items.map((item) => ({
        productVariantId: item.productVariantId,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: {
        firstName: data.firstName,
        lastName: data.lastName,
        streetAddress: data.address + (data.apartment ? ` ${data.apartment}` : ''),
        city: data.city,
        state: data.state,
        postalCode: data.zipCode,
        country: data.country,
        phone: data.phoneNumber || undefined,
      },
      subtotal,
      shippingCost: 0,
      total,
    };

    createOrder.mutate(orderPayload);
  };

  const deliveryId = useId();
  const countryId = useId();
  const firstNameId = useId();
  const lastNameId = useId();
  const addressId = useId();
  const apartmentId = useId();
  const cityId = useId();
  const stateId = useId();
  const zipId = useId();
  const phoneId = useId();

  return (
    <aside className='mx-auto w-full px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-12.5'>
      <form
        className='space-y-10 md:space-y-12 lg:space-y-16'
        autoComplete='on'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className='space-y-4'>
          <h2 className='text-xl md:text-2xl leading-none text-(--checkout-muted-text)'>
            Delivery
          </h2>

          <div
            className='rounded-[8px] border border-(--checkout-divider)'
            role='radiogroup'
            aria-labelledby={deliveryId}
          >
            <span id={deliveryId} className='sr-only'>
              Delivery Method
            </span>

            <label
              className={`flex cursor-pointer items-center justify-between rounded-t-[8px] border p-4 transition ${
                deliveryMethod === 'ship'
                  ? 'border-(--text-primary) bg-[#f7f2f3]'
                  : 'border-transparent bg-white hover:bg-(--checkout-panel-bg)'
              }`}
            >
              <span className='flex items-center gap-3'>
                <input
                  type='radio'
                  {...register('deliveryMethod')}
                  value='ship'
                  className='h-4 w-4 accent-(--text-primary)'
                />
                <span className='text-base text-(--checkout-muted-text)'>Ship</span>
              </span>
              <Truck className='h-4 w-4 text-(--text-primary)/70' />
            </label>

            <label
              className={`mt-1 flex cursor-pointer items-center justify-between rounded-[8px] border px-3 py-3 transition ${
                deliveryMethod === 'pickup'
                  ? 'border-(--text-primary) bg-[#f7f2f3]'
                  : 'border-transparent bg-white hover:bg-(--checkout-panel-bg)'
              }`}
            >
              <span className='flex items-center gap-3'>
                <input
                  type='radio'
                  {...register('deliveryMethod')}
                  value='pickup'
                  className='h-4 w-4 accent-(--text-primary)'
                />
                <span className='text-base text-(--checkout-muted-text)'>Pick up</span>
              </span>
              <Store className='h-4 w-4 text-(--checkout-muted-text)' />
            </label>
          </div>
        </section>

        <section className='space-y-3'>
          <h2 className='text-xl md:text-2xl leading-none text-(--checkout-muted-text)'>
            Shipping Address
          </h2>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <div>
              <label htmlFor={firstNameId} className='sr-only'>
                First Name
              </label>
              <input
                id={firstNameId}
                type='text'
                autoComplete='given-name'
                placeholder='First Name'
                {...register('firstName')}
                className={inputBaseClass}
              />
            </div>
            <div>
              <label htmlFor={lastNameId} className='sr-only'>
                Last Name
              </label>
              <input
                id={lastNameId}
                type='text'
                autoComplete='family-name'
                placeholder='Last Name'
                {...register('lastName')}
                className={inputBaseClass}
              />
            </div>
          </div>

          <div className='relative'>
            <label htmlFor={addressId} className='sr-only'>
              Address
            </label>
            <input
              id={addressId}
              type='text'
              autoComplete='street-address'
              placeholder='Address'
              {...register('address')}
              className={`${inputBaseClass} pr-10`}
            />
            <Search className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--checkout-muted-text)' />
          </div>

          <div>
            <label htmlFor={apartmentId} className='sr-only'>
              Apartment, suite, etc. (Optional)
            </label>
            <input
              id={apartmentId}
              type='text'
              autoComplete='address-line2'
              placeholder='Apartment, suite, etc. (Optional)'
              {...register('apartment')}
              className={inputBaseClass}
            />
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_1fr]'>
            <div>
              <label htmlFor={cityId} className='sr-only'>
                City
              </label>
              <input
                id={cityId}
                type='text'
                autoComplete='address-level2'
                placeholder='City'
                {...register('city')}
                className={inputBaseClass}
              />
            </div>

            <div>
              <label htmlFor={stateId} className='sr-only'>
                State
              </label>
              <input
                id={stateId}
                type='text'
                autoComplete='address-level1'
                placeholder='State / Province'
                {...register('state')}
                className={inputBaseClass}
              />
            </div>

            <div>
              <label htmlFor={zipId} className='sr-only'>
                Zip Code
              </label>
              <input
                id={zipId}
                type='text'
                autoComplete='postal-code'
                placeholder='Zip Code'
                {...register('zipCode')}
                className={inputBaseClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor={countryId} className='sr-only'>
              Country or region
            </label>
            <input
              id={countryId}
              type='text'
              autoComplete='country-name'
              placeholder='Country or region'
              {...register('country')}
              className={inputBaseClass}
            />
          </div>

          <div>
            <label htmlFor={phoneId} className='sr-only'>
              Phone Number
            </label>
            <input
              id={phoneId}
              type='tel'
              autoComplete='tel'
              placeholder='Phone Number'
              {...register('phoneNumber')}
              className={inputBaseClass}
            />
          </div>


        </section>

        {/* <section className='space-y-3'>
          <h2 className='text-xl md:text-2xl leading-none text-(--checkout-muted-text)'>
            Shipping method
          </h2>

          <div className='flex items-center justify-center rounded-[8px] bg-(--checkout-panel-bg) px-4 py-4 text-center text-base text-(--checkbox-muted-subtext)'>
            <span>Enter your shipping address to view available shipping methods.</span>
          </div>
        </section> */}

        <button
          type='submit'
          disabled={createOrder.isPending}
          className='w-full rounded-full bg-(--text-primary) px-6 py-4 text-xl text-white transition hover:opacity-95 disabled:opacity-50 sm:py-5 sm:text-2xl'
        >
          {createOrder.isPending ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </aside>
  );
}
