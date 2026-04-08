"use client";

import CheckoutReferFriendModal from "@/components/home/checkout/checkout-refer-friend-modal";
import CheckoutReviewModal from "@/components/home/checkout/checkout-review-modal";
import CheckoutSuccessModal from "@/components/home/checkout/checkout-success-modal";
import { ChevronDown, Lock, Search, Store, Truck } from "lucide-react";
import { useId, useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";

type DeliveryMethod = "ship" | "pickup";

type CheckoutFormValues = {
  email: string;
  marketingOptIn: boolean;
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
  saveInfo: boolean;
  paymentMethod: "credit-card";
  cardNumber: string;
  expiry: string;
  securityCode: string;
  cardName: string;
  billingSameAsShipping: boolean;
};

const inputBaseClass =
  "w-full rounded-[8px] border border-(--checkout-divider) bg-white px-3 py-4 text-base text-(--checkout-muted-text) placeholder:text-(--checkbox-muted-subtext) focus:border-(--text-primary) focus:outline-none";

export default function CheckoutLeftPanel() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const { register, control, handleSubmit } = useForm<CheckoutFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      marketingOptIn: true,
      deliveryMethod: "ship",
      country: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      saveInfo: true,
      paymentMethod: "credit-card",
      cardNumber: "",
      expiry: "",
      securityCode: "",
      cardName: "",
      billingSameAsShipping: true,
    },
  });
  const deliveryMethod = useWatch({ control, name: "deliveryMethod" });

  const onSubmit: SubmitHandler<CheckoutFormValues> = () => {
    setIsReferModalOpen(false);
    setIsReviewModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleOpenReviewModal = () => {
    setIsReferModalOpen(false);
    setIsSuccessModalOpen(false);
    setIsReviewModalOpen(true);
  };

  const handleOpenReferModal = () => {
    setIsSuccessModalOpen(false);
    setIsReviewModalOpen(false);
    setIsReferModalOpen(true);
  };

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
  const cardNumberId = useId();
  const expiryId = useId();
  const securityCodeId = useId();
  const cardNameId = useId();
  const billingAddressId = useId();

  return (
    <aside className='mx-auto w-full px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-12.5'>
      <form
        className='space-y-10 md:space-y-12 lg:space-y-16'
        autoComplete='on'
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <section className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl md:text-2xl leading-none text-(--checkout-muted-text)'>
              Contact
            </h2>
            <button
              type='button'
              className='text-sm md:text-base text-(--text-primary) underline'>
              Sign in
            </button>
          </div>

          <label htmlFor={emailId} className='sr-only'>
            Email
          </label>
          <input
            id={emailId}
            type='email'
            autoComplete='email'
            placeholder='Email'
            {...register("email")}
            className={inputBaseClass}
          />

          <div className='flex items-center gap-3'>
            <input
              id={marketingId}
              type='checkbox'
              {...register("marketingOptIn")}
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
          <h2 className='text-xl md:text-2xl leading-none text-(--checkout-muted-text)'>
            Delivery
          </h2>

          <div
            className='rounded-[8px] border border-(--checkout-divider)'
            role='radiogroup'
            aria-labelledby={deliveryId}>
            <span id={deliveryId} className='sr-only'>
              Delivery Method
            </span>

            <label
              className={`flex cursor-pointer items-center justify-between rounded-t-[8px] border p-4 transition ${
                deliveryMethod === "ship"
                  ? "border-(--text-primary) bg-[#f7f2f3]"
                  : "border-transparent bg-white hover:bg-(--checkout-panel-bg)"
              }`}>
              <span className='flex items-center gap-3'>
                <input
                  type='radio'
                  {...register("deliveryMethod")}
                  value='ship'
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
                  {...register("deliveryMethod")}
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
            Country/Region
          </h2>

          <div className='relative'>
            <label htmlFor={countryId} className='sr-only'>
              Country or region
            </label>
            <select
              id={countryId}
              defaultValue=''
              {...register("country")}
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
                autoComplete='given-name'
                placeholder='First Name'
                {...register("firstName")}
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
                {...register("lastName")}
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
              {...register("address")}
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
              {...register("apartment")}
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
                {...register("city")}
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
                {...register("state")}
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
                autoComplete='postal-code'
                placeholder='Zip Code'
                {...register("zipCode")}
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
              autoComplete='tel'
              placeholder='Phone Number'
              {...register("phoneNumber")}
              className={inputBaseClass}
            />
          </div>

          <div className='flex items-center gap-3'>
            <input
              id={saveInfoId}
              type='checkbox'
              {...register("saveInfo")}
              className='h-4 w-4 rounded border-(--checkout-divider) accent-(--text-primary)'
            />
            <label
              htmlFor={saveInfoId}
              className='text-base text-(--checkbox-muted-foreground)'>
              Save this information for next time
            </label>
          </div>
        </section>

        <section className='space-y-3'>
          <h2 className='text-xl md:text-2xl leading-none text-(--checkout-muted-text)'>
            Shipping method
          </h2>

          <div className='flex items-center justify-center rounded-[8px] bg-(--checkout-panel-bg) px-4 py-4 text-center text-base text-(--checkbox-muted-subtext)'>
            <span>Enter your shipping address to view available shipping methods.</span>
          </div>
        </section>

        <section className='space-y-3'>
          <h2 className='text-xl md:text-2xl leading-none text-(--checkout-muted-text)'>
            Payment
          </h2>

          <p className='text-base text-(--checkbox-muted-subtext)'>
            All transactions are secure and encrypted.
          </p>

          <div className='overflow-hidden rounded-[8px] border border-(--checkout-divider)'>
            <label className='flex flex-wrap items-center justify-between gap-2 border-b border-(--checkout-divider) bg-[#FEF4F4] px-3 py-3'>
              <span className='flex items-center gap-2'>
                <input
                  type='radio'
                  {...register("paymentMethod")}
                  value='credit-card'
                  className='h-4 w-4 accent-(--text-primary)'
                />
                <span className='text-base text-(--checkout-muted-text)'>
                  Credit card
                </span>
              </span>

              <span className='ml-auto flex items-center gap-1 sm:ml-0'>
                <span className='rounded-lg border border-(--checkout-divider) bg-white px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-[#3556a7]'>
                  VISA
                </span>
                <span className='rounded-lg border border-(--checkout-divider) bg-white px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-[#e45a4a]'>
                  MC
                </span>
                <span className='rounded-lg border border-(--checkout-divider) bg-white px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-[#4f86d9]'>
                  AMEX
                </span>
                <span className='rounded-lg border border-(--checkout-divider) bg-white px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-(--checkout-muted-text)'>
                  +5
                </span>
              </span>
            </label>

            <div className='space-y-3 bg-(--checkout-panel-bg) p-4'>
              <div className='relative'>
                <label htmlFor={cardNumberId} className='sr-only'>
                  Card Number
                </label>
                <input
                  id={cardNumberId}
                  type='text'
                  autoComplete='cc-number'
                  inputMode='numeric'
                  placeholder='Card Number'
                  {...register("cardNumber")}
                  className={`${inputBaseClass} pr-10`}
                />
                <Lock className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--checkbox-muted-subtext)' />
              </div>

              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <div>
                  <label htmlFor={expiryId} className='sr-only'>
                    Expire Date (MM/YY)
                  </label>
                  <input
                    id={expiryId}
                    type='text'
                    autoComplete='cc-exp'
                    inputMode='numeric'
                    placeholder='Expire Date (MM/YY)'
                    {...register("expiry")}
                    className={inputBaseClass}
                  />
                </div>

                <div>
                  <label htmlFor={securityCodeId} className='sr-only'>
                    Security Code
                  </label>
                  <input
                    id={securityCodeId}
                    type='text'
                    autoComplete='cc-csc'
                    inputMode='numeric'
                    placeholder='Security Code'
                    {...register("securityCode")}
                    className={inputBaseClass}
                  />
                </div>
              </div>

              <div className='relative'>
                <label htmlFor={cardNameId} className='sr-only'>
                  Name on Card
                </label>
                <input
                  id={cardNameId}
                  type='text'
                  autoComplete='cc-name'
                  placeholder='Name on Card'
                  {...register("cardName")}
                  className={`${inputBaseClass} pr-10`}
                />
                <Lock className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--checkbox-muted-subtext)' />
              </div>

              <div className='flex items-center gap-3'>
                <input
                  id={billingAddressId}
                  type='checkbox'
                  {...register("billingSameAsShipping")}
                  className='h-4 w-4 rounded border-(--checkout-divider) accent-(--text-primary)'
                />
                <label
                  htmlFor={billingAddressId}
                  className='text-base text-(--checkout-muted-text)'>
                  Use shipping address as billing address
                </label>
              </div>
            </div>
          </div>
        </section>

        <button
          type='submit'
          className='w-full rounded-full bg-(--text-primary) px-6 py-4 text-xl text-white transition hover:opacity-95 sm:py-5 sm:text-2xl'>
          Pay Now
        </button>
      </form>

      <CheckoutSuccessModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onOpenReview={handleOpenReviewModal}
      />

      <CheckoutReviewModal
        open={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onOpenReferFriend={handleOpenReferModal}
      />

      <CheckoutReferFriendModal
        open={isReferModalOpen}
        onClose={() => setIsReferModalOpen(false)}
      />
    </aside>
  );
}
