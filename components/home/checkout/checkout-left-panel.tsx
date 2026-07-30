'use client';

import { useCreateOrder } from '@/hooks/useOrders';
import { useCartStore } from '@/store/useCartStore';
import { Search, Store, Truck } from 'lucide-react';
import { useId } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useEstimateShipping } from '@/hooks/useShipping';
import { useEffect, useMemo } from 'react';

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
  shippingMethodId?: string;
};

const inputBaseClass =
  'w-full rounded-[8px] border border-(--checkout-divider) bg-white px-3 py-4 text-base text-(--checkout-muted-text) placeholder:text-(--checkbox-muted-subtext) focus:border-(--text-primary) focus:outline-none';

export default function CheckoutLeftPanel() {
  const { items, appliedCoupon, shippingMethod, setShippingMethod } = useCartStore();
  const createOrder = useCreateOrder();
  const { register, control, handleSubmit, setValue } = useForm<CheckoutFormValues>({
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
      shippingMethodId: '',
    },
  });
  const deliveryMethod = useWatch({ control, name: 'deliveryMethod' });
  const country = useWatch({ control, name: 'country' });
  const state = useWatch({ control, name: 'state' });
  const zipCode = useWatch({ control, name: 'zipCode' });
  const shippingMethodId = useWatch({ control, name: 'shippingMethodId' });

  const estimatePayload = useMemo(() => ({
    items: items.map((item) => ({
      productVariantId: item.productVariantId,
      quantity: item.quantity,
      isSubscription: item.isSubscription
    })),
    country,
    state,
    zipCode
  }), [items, country, state, zipCode]);

  const canEstimate = items.length > 0 && !!country; 
  const { data: estimateData, isLoading: isEstimating } = useEstimateShipping(estimatePayload, canEstimate);

  useEffect(() => {
    if (estimateData?.methods && estimateData.methods.length > 0) {
      // If currently selected method is not in the list or no method selected, select the first one
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isValidCurrentMethod = estimateData.methods.some((m: any) => m.methodId === shippingMethodId);
      
      if (!isValidCurrentMethod) {
        const firstMethod = estimateData.methods[0];
        setValue('shippingMethodId', firstMethod.methodId);
        setShippingMethod({ methodId: firstMethod.methodId, name: firstMethod.name, cost: firstMethod.cost });
      } else {
        // Sync the cost in case it changed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentMethod = estimateData.methods.find((m: any) => m.methodId === shippingMethodId);
        if (currentMethod) {
          setShippingMethod({ methodId: currentMethod.methodId, name: currentMethod.name, cost: currentMethod.cost });
        }
      }
    } else {
      setShippingMethod(null);
    }
  }, [estimateData?.methods, shippingMethodId, setValue, setShippingMethod]);

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!data.shippingMethodId) {
      toast.error('Please select a shipping method');
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
      shippingCost: shippingMethod?.cost || 0,
      shippingMethodId: data.shippingMethodId || undefined,
      total,
      ...(appliedCoupon && { couponCode: appliedCoupon.code }),
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
                required
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
                required
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
              required
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
                required
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
                required
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
                required
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
              required
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
              required
              {...register('phoneNumber')}
              className={inputBaseClass}
            />
          </div>
        </section>

        <section className='space-y-3'>
          <h2 className='text-xl md:text-2xl leading-none text-(--checkout-muted-text)'>
            Shipping method
          </h2>

          {!country ? (
            <div className='flex items-center justify-center rounded-[8px] bg-(--checkout-panel-bg) px-4 py-4 text-center text-base text-(--checkbox-muted-subtext)'>
              <span>Enter your shipping address to view available shipping methods.</span>
            </div>
          ) : isEstimating ? (
            <div className='flex items-center justify-center rounded-[8px] border border-(--checkout-divider) px-4 py-4'>
              <span className="text-(--checkbox-muted-subtext)">Calculating...</span>
            </div>
          ) : estimateData?.methods?.length ? (
            <div className='rounded-[8px] border border-(--checkout-divider)'>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {estimateData.methods.map((method: any, idx: number) => (
                <label
                  key={method.methodId}
                  className={`flex cursor-pointer items-center justify-between p-4 transition ${
                    idx === 0 ? 'rounded-t-[8px]' : ''
                  } ${
                    idx === estimateData.methods.length - 1 ? 'rounded-b-[8px]' : 'border-b border-(--checkout-divider)'
                  } ${
                    shippingMethodId === method.methodId
                      ? 'bg-[#f7f2f3]'
                      : 'bg-white hover:bg-(--checkout-panel-bg)'
                  }`}
                  onClick={() => {
                    setValue('shippingMethodId', method.methodId);
                    setShippingMethod({ methodId: method.methodId, name: method.name, cost: method.cost });
                  }}
                >
                  <span className='flex items-center gap-3'>
                    <input
                      type='radio'
                      {...register('shippingMethodId')}
                      value={method.methodId}
                      className='h-4 w-4 accent-(--text-primary)'
                    />
                    <span className='flex flex-col'>
                      <span className='text-base text-(--checkout-muted-text)'>{method.name}</span>
                      {method.estimatedDeliveryTime && (
                        <span className="text-xs text-(--checkbox-muted-subtext)">{method.estimatedDeliveryTime}</span>
                      )}
                    </span>
                  </span>
                  <span className='text-base font-medium text-(--checkout-muted-text)'>
                    {method.cost === 0 ? 'Free' : `$${method.cost.toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className='flex items-center justify-center rounded-[8px] bg-(--checkout-panel-bg) px-4 py-4 text-center text-base text-red-500'>
              <span>No shipping methods available for this address.</span>
            </div>
          )}
        </section>

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
