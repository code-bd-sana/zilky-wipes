"use client";

import { useChangePassword, useGetMe, useUpdateProfile } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AccountInfo() {
  const { data: userResponse, isLoading: isUserLoading } = useGetMe();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    if (userResponse?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfileData({
        firstName: userResponse.data.firstName || "",
        lastName: userResponse.data.lastName || "",
        username: userResponse.data.username || "",
        email: userResponse.data.email || "",
      });
    }
  }, [userResponse]);

  const handleUpdate = (field: string, value: string) => {
    // replace with real save logic
    console.log("Update", field, value);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(profileData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    changePassword.mutate(
      {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      },
      {
        onSuccess: () => {
          setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
      }
    );
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <section className='max-w-3xl mx-auto bg-white py-12 px-6 md:px-10 mt-22 pb-40'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-base text-[#979191]'>Account Information</h1>
      </div>

      <form onSubmit={handleProfileSubmit} className='space-y-6 mb-12 border-b border-[#F0F0F0] pb-12'>
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <p className='text-sm font-base text-[#474747] mb-3'>First Name</p>
            <input
              type='text'
              name='firstName'
              value={profileData.firstName}
              onChange={handleProfileChange}
              placeholder='Enter first name'
              required
              className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 text-sm text-[#333333]'
            />
          </div>
          <div className='flex-1'>
            <p className='text-sm font-base text-[#474747] mb-3'>Last Name</p>
            <input
              type='text'
              name='lastName'
              value={profileData.lastName}
              onChange={handleProfileChange}
              placeholder='Enter last name'
              required
              className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 text-sm text-[#333333]'
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex-1'>
            <p className='text-sm font-base text-[#474747] mb-3'>Username</p>
            <input
              type='text'
              name='username'
              value={profileData.username}
              onChange={handleProfileChange}
              placeholder='Enter username'
              className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 text-sm text-[#333333]'
            />
          </div>
          <div className='flex-1'>
            <p className='text-sm font-base text-[#474747] mb-3'>Email Address</p>
            <input
              type='email'
              name='email'
              value={profileData.email}
              onChange={handleProfileChange}
              placeholder='user@example.com'
              required
              className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 text-sm text-[#333333]'
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={updateProfile.isPending}
          className='px-6 py-2.5 text-sm font-medium bg-[#FAFAFA] border border-[#E5E5E5] text-[#333333] rounded-[6px] hover:bg-gray-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
          {updateProfile.isPending ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className='space-y-6 mb-12 border-b border-[#F0F0F0] pb-12'>
        <p className='text-sm font-base text-[#474747] mb-3'>Security</p>
        
        <div className="max-w-xl space-y-6">
          <div>
            <input
              type='password'
              name='oldPassword'
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              placeholder='Enter current password'
              required
              className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 text-sm text-[#333333]'
            />
          </div>

          <div>
            <input
              type='password'
              name='newPassword'
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              placeholder='Enter new password'
              required
              className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 text-sm text-[#333333]'
            />
          </div>

          <div>
            <input
              type='password'
              name='confirmPassword'
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              placeholder='Confirm new password'
              required
              className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 text-sm text-[#333333]'
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={changePassword.isPending}
          className='px-6 py-2.5 text-sm font-medium bg-[#FAFAFA] border border-[#E5E5E5] text-[#333333] rounded-[6px] hover:bg-gray-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
          {changePassword.isPending ? "Updating..." : "Update Password"}
        </button>
      </form>

      {/* Phone Number */}
      <div className='mb-11 border-b border-[#F0F0F0] pb-10'>
        <div className='flex items-center mb-3'>
          <p className='text-sm font-base text-[#474747]'>Phone Number</p>
        </div>

        <div className='relative'>
          <input
            type='tel'
            value={phone}
            placeholder='+1 111 1111 111'
            onChange={(e) => setPhone(e.target.value)}
            className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 pr-28 text-sm text-[#333333]'
          />

          <button
            onClick={() => handleUpdate("phone", phone)}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm bg-[#FAFAFA] border border-[#E5E5E5] text-[#333333] rounded-[6px] hover:bg-gray-50 transition cursor-pointer'>
            Update
          </button>
        </div>

        <p className='text-xs text-[#979191] mt-3'>
          Optional delivery notifications
        </p>
      </div>

      {/* Shipping */}
      <div className='mb-11 border-b border-[#F0F0F0] pb-10'>
        <div className='flex items-center mb-3'>
          <p className='text-base font-base text-[#979191]'>Shipping</p>
        </div>

        <p className='text-sm font-base text-[#474747] mb-3'>Default Address</p>

        <div className='relative'>
          <textarea
            value={address}
            placeholder='123 Oak Street, Brooklyn, NY 11201'
            onChange={(e) => setAddress(e.target.value)}
            className='w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 pr-28 text-sm text-[#333333] resize-none'
            rows={1}
          />

          <button
            onClick={() => handleUpdate("address", address)}
            className='absolute right-2 top-2 px-3 py-1 text-sm bg-[#FAFAFA] border border-[#E5E5E5] text-[#333333] rounded-[6px] hover:bg-gray-50 transition cursor-pointer'>
            Update
          </button>
        </div>

        <p className='text-xs text-[#979191] mt-3'>Used for all deliveries</p>
      </div>

      {/* Payment */}
      <div className='mb-10 border-b border-[#F0F0F0] pb-10'>
        <div className='flex items-center mb-3'>
          <p className='text-base font-base text-[#979191]'>Payment</p>
        </div>

        <div className='relative'>
          <p className='text-sm font-base text-[#474747] mb-1'>
            Payment Method
          </p>
          <input
            type='text'
            value={payment}
            placeholder='Visa •••• 4242'
            onChange={(e) => setPayment(e.target.value)}
            className='mt-1 w-full rounded-[6px] border border-[#F2F2F2] px-4 py-3.5 pr-28 text-sm text-[#333333]'
          />

          <button
            onClick={() => handleUpdate("payment", payment)}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm bg-[#FAFAFA] border border-[#E5E5E5] text-[#333333] rounded-[6px] hover:bg-gray-50 transition cursor-pointer'>
            Update
          </button>

          <p className='text-xs text-[#979191] mt-3'>Managed by Stripe</p>
        </div>
      </div>

      {/* Billing History */}
      <div className='mb-12'>
        <p className='text-sm font-base text-[#474747] mb-4'>Billing History</p>
        <div className=''>
          <button className='w-full px-8 py-3 text-sm font-base text-[#333333] border border-[#F2F2F2] rounded-[6px] hover:bg-gray-50 transition cursor-pointer'>
            Download Invoices
          </button>
          <p className='text-xs text-[#979191] mt-3'>View past invoices</p>
        </div>
      </div>

      {/* Cancel Subscription */}
      <div className='border border-[#E5E5E5] rounded-xl p-8'>
        <div className='mb-6'>
          <p className='text-(--text-primary) font-medium text-base mb-2'>
            Cancel Subscription
          </p>
          <p className='text-base text-[#979191] leading-relaxed'>
            This will stop all future deliveries immediately. Your order history
            will remain accessible, and you can reactivate your subscription at
            any time.
          </p>
        </div>

        <button className='bg-[#DC2626] hover:bg-red-800 transition text-white font-base px-8 py-3.5 rounded-full text-sm w-full md:w-auto cursor-pointer'>
          Cancel My Subscription
        </button>
      </div>
    </section>
  );
}
