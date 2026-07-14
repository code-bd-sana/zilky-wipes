'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2, Tag as TagIcon } from 'lucide-react';
import { useTags } from '@/hooks/useCategoryTag';
import TagModal from './tag-modal';
import DeleteConfirmModal from './delete-confirm-modal';

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
}

export default function TagList() {
  const { data: tagsResponse, isLoading } = useTags();
  const tags: Tag[] = tagsResponse?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openAddModal = () => {
    setEditingTag(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tag: Tag) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  };

  const openDeleteModal = (tag: Tag) => {
    setDeletingTag(tag);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className='flex flex-col h-full bg-white'>
      {/* Toolbar */}
      <div className='flex items-center justify-between p-6 border-b border-gray-100'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
          <input
            type='text'
            placeholder='Search tags...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-[8px] text-[14px] w-70 focus:outline-none focus:ring-2 focus:ring-[#1e2d4a]/20 focus:border-[#1e2d4a] transition-all'
          />
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#010101] text-white px-5 py-2.5 rounded-[8px] text-[14px] font-medium hover:bg-black/90 transition-colors"
        >
          <Plus size={18} />
          Add Tag
        </button>
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
                Slug
              </th>
              <th className='px-6 py-4 text-[13px] font-medium text-gray-500 uppercase tracking-wider'>
                Created
              </th>
              <th className='px-6 py-4 text-[13px] font-medium text-gray-500 uppercase tracking-wider w-30 text-right'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {isLoading ? (
              <tr>
                <td colSpan={4} className='px-6 py-12 text-center text-gray-400'>
                  <div className='flex flex-col items-center justify-center gap-3'>
                    <Loader2 className="w-6 h-6 animate-spin text-[#010101]" />
                    <span className='text-[14px]'>Loading tags...</span>
                  </div>
                </td>
              </tr>
            ) : filteredTags.length === 0 ? (
              <tr>
                <td colSpan={4} className='px-6 py-16 text-center text-gray-400'>
                  <div className='flex flex-col items-center justify-center gap-3'>
                    <div className='w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100'>
                      <TagIcon className='w-5 h-5 text-gray-400' />
                    </div>
                    <div>
                      <p className='text-[15px] font-medium text-gray-900'>No tags found</p>
                      <p className='text-[14px] mt-1'>Get started by creating a new tag.</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTags.map((tag) => (
                <tr key={tag.id} className='hover:bg-gray-50/50 transition-colors group'>
                  <td className='px-6 py-4'>
                    <span className='text-[14px] font-medium text-gray-900'>{tag.name}</span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-600 text-[12px] font-mono'>
                      {tag.slug}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='text-[14px] text-gray-500'>
                      {new Date(tag.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                      <button
                        onClick={() => openEditModal(tag)}
                        className='p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors'
                        title='Edit'
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(tag)}
                        className='p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors'
                        title='Delete'
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

      {isModalOpen && (
        <TagModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tag={editingTag} />
      )}

      {isDeleteModalOpen && deletingTag && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          targetId={deletingTag.id}
          targetName={deletingTag.name}
          type='tag'
        />
      )}
    </div>
  );
}
