'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select options...',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionId: string) => {
    if (value.includes(optionId)) {
      onChange(value.filter((id) => id !== optionId));
    } else {
      onChange([...value, optionId]);
    }
  };

  const removeOption = (e: React.MouseEvent, optionId: string) => {
    e.stopPropagation();
    onChange(value.filter((id) => id !== optionId));
  };

  const selectedOptions = options.filter((opt) => value.includes(opt.id));

  return (
    <div className='relative w-full' ref={containerRef}>
      <div
        className='min-h-11 sm:min-h-12 w-full px-3 py-2 border border-[#E7E5E4] rounded-md text-sm text-(--text-primary) bg-white cursor-pointer flex items-center justify-between gap-2 focus-within:ring-1 focus-within:ring-[#1e2d4a] focus-within:border-[#1e2d4a] transition-colors'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex flex-wrap gap-1.5 flex-1'>
          {selectedOptions.length === 0 ? (
            <span className='text-[#979191] py-1'>{placeholder}</span>
          ) : (
            selectedOptions.map((opt) => (
              <span
                key={opt.id}
                className='flex items-center gap-1 bg-[#F4F4F5] px-2 py-1 rounded-md text-xs font-medium'
              >
                {opt.name}
                <X
                  size={14}
                  className='cursor-pointer text-[#71717A] hover:text-[#1e2d4a]'
                  onClick={(e) => removeOption(e, opt.id)}
                />
              </span>
            ))
          )}
        </div>

        <ChevronsUpDown size={16} className='text-[#979191] shrink-0' />
      </div>

      {isOpen && (
        <div className='absolute z-50 w-full mt-1 bg-white border border-[#E7E5E4] rounded-md shadow-lg max-h-60 overflow-y-auto'>
          {options.length === 0 ? (
            <div className='p-3 text-sm text-center text-[#979191]'>No options available</div>
          ) : (
            <ul className='py-1'>
              {options.map((opt) => {
                const isSelected = value.includes(opt.id);
                return (
                  <li
                    key={opt.id}
                    className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-[#F4F4F5] ${
                      isSelected ? 'bg-[#F4F4F5]' : ''
                    }`}
                    onClick={() => toggleOption(opt.id)}
                  >
                    <span className={isSelected ? 'font-medium' : ''}>{opt.name}</span>
                    {isSelected && <Check size={16} className='text-[#1e2d4a]' />}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
