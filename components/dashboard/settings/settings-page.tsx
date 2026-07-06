'use client';

import { useChangePassword, useGetMe, useUpdateProfile } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { data: userResponse, isLoading: isUserLoading } = useGetMe();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (userResponse?.data) {
      setProfileData({
        firstName: userResponse.data.firstName || '',
        lastName: userResponse.data.lastName || '',
        username: userResponse.data.username || '',
        email: userResponse.data.email || '',
      });
    }
  }, [userResponse]);

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
      toast.error('New passwords do not match.');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long.');
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
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        },
      },
    );
  };

  if (isUserLoading) {
    return (
      <div className='flex justify-center py-20'>
        <Loader2 className='w-8 h-8 animate-spin text-gray-400' />
      </div>
    );
  }

  return (
    <section className='py-8 px-4 sm:px-6 flex flex-col rounded-[10px]'>
      <div className='max-w-280'>
        <p className='mb-10 text-(--checkbox-muted-subtext)'>Account Information</p>

        <form
          onSubmit={handleProfileSubmit}
          className='space-y-6 mb-12 border-b border-gray-100 pb-12'
        >
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Profile Details</h3>

          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1'>
              <label className='block text-sm text-(--text-primary) mb-1.5'>First Name</label>
              <input
                type='text'
                name='firstName'
                value={profileData.firstName}
                onChange={handleProfileChange}
                placeholder='Enter first name'
                required
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            <div className='flex-1'>
              <label className='block text-sm text-(--text-primary) mb-1.5'>Last Name</label>
              <input
                type='text'
                name='lastName'
                value={profileData.lastName}
                onChange={handleProfileChange}
                placeholder='Enter last name'
                required
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>
          </div>

          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1'>
              <label className='block text-sm text-(--text-primary) mb-1.5'>Username</label>
              <input
                type='text'
                name='username'
                value={profileData.username}
                onChange={handleProfileChange}
                placeholder='Enter username'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            <div className='flex-1'>
              <label className='block text-sm text-(--text-primary) mb-1.5'>Email Address</label>
              <input
                type='email'
                name='email'
                value={profileData.email}
                onChange={handleProfileChange}
                placeholder='Enter email address'
                required
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={updateProfile.isPending}
            className='mt-7 sm:mt-8 px-6 py-3.5 sm:py-4 text-[#262626] font-medium bg-[#FAFAF9] border border-[#E5E7EB] rounded-[10px] hover:bg-gray-200 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {updateProfile.isPending ? 'Updating Profile...' : 'Update Profile'}
          </button>
        </form>

        <form onSubmit={handlePasswordSubmit} className='space-y-6'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>Security</h3>

          <div className='max-w-xl space-y-6'>
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>Current Password</label>
              <input
                type='password'
                name='oldPassword'
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                placeholder='Enter current password'
                required
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>New Password</label>
              <input
                type='password'
                name='newPassword'
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder='Enter new password'
                required
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Confirm New Password
              </label>
              <input
                type='password'
                name='confirmPassword'
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder='Confirm new password'
                required
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={changePassword.isPending}
            className='mt-7 sm:mt-8 px-6 py-3.5 sm:py-4 text-[#262626] font-medium bg-[#FAFAF9] border border-[#E5E7EB] rounded-[10px] hover:bg-gray-200 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {changePassword.isPending ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>
    </section>
  );
}
