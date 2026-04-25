"use client";

import { useState } from "react";
export default function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <section className='py-8 px-4 sm:px-6 flex flex-col rounded-[10px]'>
      <div className='max-w-280'>
        <p className='mb-10 text-(--checkbox-muted-subtext)'>
          Account Information
        </p>
        {/* Form Fields */}
        <div className='space-y-6 '>
          <div className='flex flex-col md:flex-row gap-x-6'>
            {/* First Name */}
            <div className='flex-1'>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                First Name
              </label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='Enter first name '
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            {/* Last Name */}
            <div className='flex-1'>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Last Name
              </label>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Enter last name '
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>
          </div>

          {/* Current Password */}
          <div>
            <label className='block text-sm text-(--text-primary) mb-1.5'>
              Password
            </label>
            <input
              type='password'
              name='currentPassword'
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder='Enter current password'
              className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
            />
          </div>

          {/* New Password */}
          <div>
            <label className='block text-sm text-(--text-primary) mb-1.5'>
              New Password
            </label>
            <input
              type='password'
              name='newPassword'
              value={formData.newPassword}
              onChange={handleChange}
              placeholder='Enter new password'
              className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className='block text-sm text-(--text-primary) mb-1.5'>
              Confirm New Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm new password'
              className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className='mt-7 sm:mt-8 px-6 py-3.5 sm:py-4 text-[#262626] font-medium bg-[#FAFAF9] border border-[#E5E7EB] rounded-[10px] hover:bg-gray-200 active:scale-[0.98] transition-all duration-150 cursor-pointer'>
          Update Password & Settings
        </button>
      </div>
    </section>
  );
}
