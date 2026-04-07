"use client";

import { ChevronDown, Search, Store, Truck } from "lucide-react";
import { useId, useState } from "react";

type DeliveryMethod = "ship" | "pickup";

const inputBaseClass =
  "h-12 w-full rounded-[10px] border border-(--checkout-divider) bg-white px-4 text-base text-(--checkout-muted-text) placeholder:text-(--checkbox-muted-subtext) focus:border-(--text-primary) focus:outline-none";

export default function CheckoutLeftPanel() {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("ship");

  const emailId = useId();
  const marketingId = useId();
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
  const saveInfoId = useId();

  return (
    <aside className='mx-auto w-full max-w-190 px-6 py-8 md:px-10 md:py-10 lg:px-14'>
      <form className='space-y-8'>
        <section className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='font-heading text-4xl leading-none text-(--text-primary)'>
              Contact
            </h2>
            <button
              type='button'
              className='text-base text-(--text-primary) underline-offset-2 hover:underline'>
              Sign in
            </button>
          </div>

          <label htmlFor={emailId} className='sr-only'>
            Email
          </label>
          <input
            id={emailId}
            type='email'
            placeholder='Email'
            className={inputBaseClass}
          />

          <div className='flex items-center gap-3'>
            <input
              id={marketingId}
              type='checkbox'
              defaultChecked
              className='h-4 w-4 rounded border-(--checkout-divider) accent-(--text-primary)'
            />
            <label
              htmlFor={marketingId}
              className='text-base text-(--checkout-muted-text)'>
              Email me with news & letters
            </label>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='font-heading text-4xl leading-none text-(--text-primary)'>
            Delivery
          </h2>

          <div
            className='rounded-[10px] border border-(--checkout-divider) p-1'
            role='radiogroup'
            aria-labelledby={deliveryId}>
            <span id={deliveryId} className='sr-only'>
              Delivery Method
            </span>

            <label
              className={`flex cursor-pointer items-center justify-between rounded-[8px] border px-3 py-3 transition ${
                deliveryMethod === "ship"
                  ? "border-(--text-primary) bg-[#f7f2f3]"
                  : "border-transparent bg-white hover:bg-(--checkout-panel-bg)"
              }`}>
              <span className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='delivery-method'
                  value='ship'
                  checked={deliveryMethod === "ship"}
                  onChange={() => setDeliveryMethod("ship")}
                  className='h-4 w-4 accent-(--text-primary)'
                />
                <span className='text-base text-(--checkout-muted-text)'>Ship</span>
              </span>
              <Truck className='h-4 w-4 text-(--text-primary)/70' />
            </label>

            <label
              className={`mt-1 flex cursor-pointer items-center justify-between rounded-[8px] border px-3 py-3 transition ${
                deliveryMethod === "pickup"
                  ? "border-(--text-primary) bg-[#f7f2f3]"
                  : "border-transparent bg-white hover:bg-(--checkout-panel-bg)"
              }`}>
              <span className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='delivery-method'
                  value='pickup'
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                  className='h-4 w-4 accent-(--text-primary)'
                />
                <span className='text-base text-(--checkout-muted-text)'>Pick up</span>
              </span>
              <Store className='h-4 w-4 text-(--checkout-muted-text)' />
            </label>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='font-heading text-4xl leading-none text-(--text-primary)'>
            Country/Region
          </h2>

          <div className='relative'>
            <label htmlFor={countryId} className='sr-only'>
              Country or region
            </label>
            <select
              id={countryId}
              defaultValue=''
              className={`${inputBaseClass} appearance-none pr-10 text-(--checkbox-muted-subtext)`}>
              <option value='' disabled>
                Select...
              </option>
              <option value='us'>United States</option>
              <option value='ca'>Canada</option>
              <option value='uk'>United Kingdom</option>
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--checkout-muted-text)' />
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <div>
              <label htmlFor={firstNameId} className='sr-only'>
                First Name
              </label>
              <input
                id={firstNameId}
                type='text'
                placeholder='First Name'
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
                placeholder='Last Name'
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
              placeholder='Address'
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
              placeholder='Apartment, suite, etc. (Optional)'
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
                placeholder='City'
                className={inputBaseClass}
              />
            </div>

            <div className='relative'>
              <label htmlFor={stateId} className='sr-only'>
                State
              </label>
              <select
                id={stateId}
                defaultValue=''
                className={`${inputBaseClass} appearance-none pr-10 text-(--checkout-muted-text)`}>
                <option value='' disabled>
                  State
                </option>
                <option value='ny'>New York</option>
                <option value='ca'>California</option>
                <option value='tx'>Texas</option>
              </select>
              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--checkout-muted-text)' />
            </div>

            <div>
              <label htmlFor={zipId} className='sr-only'>
                Zip Code
              </label>
              <input
                id={zipId}
                type='text'
                placeholder='Zip Code'
                className={inputBaseClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor={phoneId} className='sr-only'>
              Phone Number
            </label>
            <input
              id={phoneId}
              type='tel'
              placeholder='Phone Number'
              className={inputBaseClass}
            />
          </div>

          <div className='flex items-center gap-3'>
            <input
              id={saveInfoId}
              type='checkbox'
              defaultChecked
              className='h-4 w-4 rounded border-(--checkout-divider) accent-(--text-primary)'
            />
            <label
              htmlFor={saveInfoId}
              className='text-base text-(--checkout-muted-text)'>
              Save this information for next time
            </label>
          </div>
        </section>
      </form>
    </aside>
  );
}
