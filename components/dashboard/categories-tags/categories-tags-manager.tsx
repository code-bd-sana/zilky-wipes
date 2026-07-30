'use client';

import React, { useState } from 'react';
import { FolderTree, Tag } from 'lucide-react';
import CategoryList from './category-list';
import TagList from './tag-list';

export default function CategoriesTagsManager() {
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories');

  return (
    <div className='flex flex-col h-full w-full max-w-7xl mx-auto px-6 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-semibold text-[#1e2d4a]'>Categories & Tags</h1>
          <p className='text-gray-500 mt-1 text-[15px]'>
            Manage product categories and organizational tags.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex items-center gap-1 bg-white p-1.5 rounded-[12px] border border-gray-200 w-max mb-6'>
        <button
          type='button'
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-[15px] font-medium transition-all ${
            activeTab === 'categories'
              ? 'bg-[#010101] text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <FolderTree size={18} />
          Categories
        </button>
        <button
          type='button'
          onClick={() => setActiveTab('tags')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-[15px] font-medium transition-all ${
            activeTab === 'tags'
              ? 'bg-[#010101] text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Tag size={18} />
          Tags
        </button>
      </div>

      {/* Content */}
      <div className='flex-1 w-full bg-white border border-gray-200 rounded-[12px] shadow-sm overflow-hidden'>
        {activeTab === 'categories' ? <CategoryList /> : <TagList />}
      </div>
    </div>
  );
}
