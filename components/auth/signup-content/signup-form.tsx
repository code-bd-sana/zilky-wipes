"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

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
            {/* First Name */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                First Name
              </label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='Pedro Duarte'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            {/* Last Name */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Last Name
              </label>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Pedro Duarte'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

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
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            {/* Username */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Username
              </label>
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='@peduarte'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            {/* Password */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter your password'
                  className='w-full px-3 pr-10 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Repeat Password */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Repeat password
              </label>
              <div className='relative'>
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  name='repeatPassword'
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  placeholder='Repeat your password'
                  className='w-full px-3 pr-10 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
                />
                <button
                  type='button'
                  onClick={() => setShowRepeatPassword((s) => !s)}
                  aria-label={
                    showRepeatPassword ? "Hide password" : "Show password"
                  }
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'>
                  {showRepeatPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSubmit}
            className='w-full mt-7 sm:mt-8 py-3.5 sm:py-4 bg-(--cart-panel-bg) text-white font-semibold rounded-full hover:bg-[#16253d] active:scale-[0.98] transition-all duration-150 text-base'>
            Sign Up
          </button>

          {/* Sign In Link */}
          <p className='text-center text-sm text-[#262626] mt-5 sm:mt-6'>
            Already have an account?{" "}
            <Link
              href='/login'
              className='text-[#262626] font-medium hover:underline'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
