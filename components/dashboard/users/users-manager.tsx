'use client';

import React, { useState } from 'react';
import { Shield, Search, Loader2, Edit2, Trash2 } from 'lucide-react';
import { useUsersList } from '@/hooks/useUsers';
import EditUserModal from './edit-user-modal';
import DeleteUserModal from './delete-user-modal';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
}

export default function UsersManager() {
  const { data: usersResponse, isLoading } = useUsersList();
  const users: User[] = usersResponse?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className='flex flex-col h-full w-full max-w-7xl mx-auto px-6 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-3xl font-semibold text-[#1e2d4a]'>User Management</h1>
          <p className='text-gray-500 mt-1 text-[15px]'>
            Manage administrators and customer accounts, edit details, and reset passwords.
          </p>
        </div>
      </div>

      <div className='flex-1 w-full bg-white border border-gray-200 rounded-[12px] shadow-sm overflow-hidden flex flex-col'>
        {/* Toolbar */}
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
            <input
              type='text'
              placeholder='Search users by name or email...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-[8px] text-[14px] w-[320px] focus:outline-none focus:ring-2 focus:ring-[#010101]/20 focus:border-[#010101] transition-all'
            />
          </div>
        </div>

        {/* Table */}
        <div className='flex-1 overflow-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-gray-100 bg-gray-50/50'>
                <th className='px-6 py-4 text-[13px] font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th className='px-6 py-4 text-[13px] font-medium text-gray-500 uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-6 py-4 text-[13px] font-medium text-gray-500 uppercase tracking-wider'>
                  Role
                </th>
                <th className='px-6 py-4 text-[13px] font-medium text-gray-500 uppercase tracking-wider'>
                  Joined Date
                </th>
                <th className='px-6 py-4 text-[13px] font-medium text-gray-500 uppercase tracking-wider w-30 text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className='px-6 py-12 text-center text-gray-400'>
                    <div className='flex flex-col items-center justify-center gap-3'>
                      <Loader2 className='w-6 h-6 animate-spin text-[#010101]' />
                      <span className='text-[14px]'>Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className='px-6 py-16 text-center text-gray-400'>
                    <div className='flex flex-col items-center justify-center gap-3'>
                      <div className='w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100'>
                        <Shield className='w-5 h-5 text-gray-400' />
                      </div>
                      <div>
                        <p className='text-[15px] font-medium text-gray-900'>No users found</p>
                        <p className='text-[14px] mt-1'>Try adjusting your search query.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className='hover:bg-gray-50/50 transition-colors group'>
                    <td className='px-6 py-4'>
                      <span className='text-[14px] font-medium text-gray-900 capitalize'>
                        {user.firstName} {user.lastName}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-[14px] text-gray-600'>{user.email}</span>
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='text-[14px] text-gray-500'>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button
                          onClick={() => openEditModal(user)}
                          className='p-1.5 text-gray-500 hover:text-[#010101] hover:bg-gray-100 rounded-md transition-colors'
                          title='Edit User'
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className='p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors'
                          title='Delete User'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
        />
      )}

      {isDeleteModalOpen && selectedUser && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
}
