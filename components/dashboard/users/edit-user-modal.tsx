'use client';

import { useUpdateUser, useUpdateUserPassword, useUpdateUserRole } from '@/hooks/useUsers';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Lock, Shield, User as UserIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { User } from './users-manager';

const basicInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Must be a valid email address'),
});

const passwordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export default function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'role' | 'password'>('info');

  const { mutate: updateUser, isPending: isUpdatingInfo } = useUpdateUser();
  const { mutate: updateRole, isPending: isUpdatingRole } = useUpdateUserRole();
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useUpdateUserPassword();

  // Basic Info Form
  const {
    register: registerInfo,
    handleSubmit: handleInfoSubmit,
    reset: resetInfo,
    formState: { errors: infoErrors },
  } = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '' },
  });

  useEffect(() => {
    if (isOpen) {
      resetInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
      resetPassword({ password: '' });
      setActiveTab('info');
    }
  }, [isOpen, user, resetInfo, resetPassword]);

  const onInfoSubmit = (data: z.infer<typeof basicInfoSchema>) => {
    updateUser({ id: user.id, data }, { onSuccess: onClose });
  };

  const onPasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    updatePassword({ id: user.id, data }, { onSuccess: onClose });
  };

  const handleRoleChange = (role: 'ADMIN' | 'USER') => {
    if (user.role === role) return; // No change
    updateRole({ id: user.id, role }, { onSuccess: onClose });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm'>
      <div
        className='w-full max-w-lg bg-white rounded-[12px] shadow-xl overflow-hidden flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <div>
            <h2 className='text-lg font-semibold text-[#1e2d4a]'>Edit User</h2>
            <p className='text-[13px] text-gray-500 mt-0.5'>
              {user.firstName} {user.lastName} ({user.email})
            </p>
          </div>
          <button
            onClick={onClose}
            className='p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors'
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className='flex px-6 pt-4 space-x-4 border-b border-gray-100'>
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-3 text-[14px] font-medium flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-[#010101] text-[#010101]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <UserIcon size={16} /> Basic Info
          </button>
          <button
            onClick={() => setActiveTab('role')}
            className={`pb-3 text-[14px] font-medium flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'role'
                ? 'border-[#010101] text-[#010101]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield size={16} /> Role
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`pb-3 text-[14px] font-medium flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'password'
                ? 'border-[#010101] text-[#010101]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Lock size={16} /> Password
          </button>
        </div>

        <div className='p-6 bg-gray-50/50 flex-1'>
          {activeTab === 'info' && (
            <form onSubmit={handleInfoSubmit(onInfoSubmit)} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-[13px] font-medium text-gray-700 mb-1.5'>
                    First Name
                  </label>
                  <input
                    {...registerInfo('firstName')}
                    className='w-full px-3 py-2 bg-white border border-gray-200 rounded-[8px] text-[14px] focus:outline-none focus:border-[#010101] focus:ring-1 focus:ring-[#010101]'
                  />
                  {infoErrors.firstName && (
                    <p className='text-red-500 text-[12px] mt-1'>{infoErrors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className='block text-[13px] font-medium text-gray-700 mb-1.5'>
                    Last Name
                  </label>
                  <input
                    {...registerInfo('lastName')}
                    className='w-full px-3 py-2 bg-white border border-gray-200 rounded-[8px] text-[14px] focus:outline-none focus:border-[#010101] focus:ring-1 focus:ring-[#010101]'
                  />
                  {infoErrors.lastName && (
                    <p className='text-red-500 text-[12px] mt-1'>{infoErrors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className='block text-[13px] font-medium text-gray-700 mb-1.5'>
                  Email Address
                </label>
                <input
                  {...registerInfo('email')}
                  className='w-full px-3 py-2 bg-white border border-gray-200 rounded-[8px] text-[14px] focus:outline-none focus:border-[#010101] focus:ring-1 focus:ring-[#010101]'
                />
                {infoErrors.email && (
                  <p className='text-red-500 text-[12px] mt-1'>{infoErrors.email.message}</p>
                )}
              </div>

              <div className='flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100'>
                <button
                  type='button'
                  onClick={onClose}
                  disabled={isUpdatingInfo}
                  className='px-4 py-2 text-[14px] font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-[8px] transition-colors disabled:opacity-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isUpdatingInfo}
                  className='flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-white bg-[#010101] hover:bg-black/90 rounded-[8px] transition-colors disabled:opacity-70'
                >
                  {isUpdatingInfo && <Loader2 size={16} className='animate-spin' />}
                  {isUpdatingInfo ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'role' && (
            <div className='space-y-6'>
              <div>
                <h3 className='text-[14px] font-medium text-gray-900'>Account Role</h3>
                <p className='text-[13px] text-gray-500 mt-1'>
                  Select the level of access this user should have.
                </p>
              </div>

              <div className='grid gap-3'>
                <label
                  className={`flex items-start gap-3 p-4 rounded-[8px] border cursor-pointer transition-all ${
                    user.role === 'USER'
                      ? 'bg-blue-50/50 border-blue-200'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='role'
                    checked={user.role === 'USER'}
                    onChange={() => handleRoleChange('USER')}
                    disabled={isUpdatingRole}
                    className='mt-1'
                  />
                  <div>
                    <p className='text-[14px] font-medium text-gray-900'>Standard User</p>
                    <p className='text-[13px] text-gray-500 mt-0.5'>
                      Can make purchases and view their own orders.
                    </p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-4 rounded-[8px] border cursor-pointer transition-all ${
                    user.role === 'ADMIN'
                      ? 'bg-purple-50/50 border-purple-200'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='role'
                    checked={user.role === 'ADMIN'}
                    onChange={() => handleRoleChange('ADMIN')}
                    disabled={isUpdatingRole}
                    className='mt-1'
                  />
                  <div>
                    <p className='text-[14px] font-medium text-gray-900'>Administrator</p>
                    <p className='text-[13px] text-gray-500 mt-0.5'>
                      Full access to the dashboard and management features.
                    </p>
                  </div>
                </label>
              </div>

              {isUpdatingRole && (
                <div className='flex items-center gap-2 text-[13px] text-gray-500 justify-end'>
                  <Loader2 size={14} className='animate-spin' /> Updating role...
                </div>
              )}
            </div>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className='space-y-4'>
              <div>
                <label className='block text-[13px] font-medium text-gray-700 mb-1.5'>
                  New Password
                </label>
                <input
                  type='password'
                  {...registerPassword('password')}
                  className='w-full px-3 py-2 bg-white border border-gray-200 rounded-[8px] text-[14px] focus:outline-none focus:border-[#010101] focus:ring-1 focus:ring-[#010101]'
                  placeholder='Enter a new secure password'
                />
                {passwordErrors.password && (
                  <p className='text-red-500 text-[12px] mt-1'>{passwordErrors.password.message}</p>
                )}
                <p className='text-[13px] text-gray-500 mt-2'>
                  This will immediately override the user&apos;s current password. They will need to
                  use this new password to log in.
                </p>
              </div>

              <div className='flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100'>
                <button
                  type='button'
                  onClick={onClose}
                  disabled={isUpdatingPassword}
                  className='px-4 py-2 text-[14px] font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-[8px] transition-colors disabled:opacity-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isUpdatingPassword}
                  className='flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-white bg-red-600 hover:bg-red-700 rounded-[8px] transition-colors disabled:opacity-70'
                >
                  {isUpdatingPassword && <Loader2 size={16} className='animate-spin' />}
                  {isUpdatingPassword ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
