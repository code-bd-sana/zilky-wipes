"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <section className='bg-white py-8 px-4 sm:px-6 flex flex-col rounded-[10px]'>
      {/* Logo at the top center - Clickable */}
      <div className='flex justify-center '>
        <Link href='/' className='inline-block'>
          <Image
            src='/Logo/Logo-02.svg'
            alt='ZilkyWipes'
            width={190}
            height={52}
            priority
            className='h-8 md:h-9 lg:h-12 w-auto object-contain mb-4'
          />
        </Link>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex items-center justify-center'>
        <div className='w-full max-w-md sm:max-w-lg md:min-w-125 mx-auto'>
          {/* Header */}
          <div className='pb-6 text-start'>
            <h1 className='text-2xl sm:text-3xl font-semibold text-(--text-primary) mb-1'>
              Sign up
            </h1>
            <p className='text-sm text-(--shop-pagination-text)'>
              Make changes to your account here. Click save when you&apos;re
              done.
            </p>
          </div>

          {/* Form Fields */}
          <div className='space-y-3 '>
            {/* Email */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='pedro@duarte.com'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            {/* Password */}
            <div>
              <div className='flex justify-between'>
                <label className='block text-sm text-(--text-primary) mb-1.5'>
                  Password
                </label>
                <Link
                  href='/forgot-password'
                  className='text-sm text-[#262626] hover:underline'>
                  Forgot your password?
                </Link>
              </div>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSubmit}
            className='w-full mt-7 sm:mt-8 py-3.5 sm:py-4 bg-(--cart-panel-bg) text-white font-semibold rounded-full hover:bg-[#16253d] active:scale-[0.98] transition-all duration-150 text-base'>
            Login
          </button>

          {/* Sign In Link */}
          <p className='text-center text-sm text-[#262626] mt-5 sm:mt-6'>
            Don&apos;t have an account?{" "}
            <Link
              href='/signup'
              className='text-[#262626] font-medium hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
