'use client';

import { MultiSelect } from '@/components/shared/multi-select';
import { useAddProduct, useCategories, useTags } from '@/hooks/useProducts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  categoryIds: z.array(z.string()).min(1, 'Select at least one category'),
  tagIds: z.array(z.string()).optional(),
  accordionDetails: z
    .array(
      z.object({
        title: z.string(),
        content: z.string(),
      }),
    )
    .optional(),
  variants: z
    .array(
      z.object({
        name: z.string().min(1, 'Variant name is required'),
        price: z.number().min(0, 'Price must be positive'),
        stock: z.number().min(0, 'Stock must be positive'),
        subscriptionEligible: z.boolean().optional(),
        subscriptionDiscount: z.number().min(0).max(100).optional(),
      }),
    )
    .min(1, 'Add at least one variant'),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AddProductPage() {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: categoriesData } = useCategories();
  const { data: tagsData } = useTags();
  const { mutate: addProduct, isPending } = useAddProduct();

  const categories = categoriesData?.data || [];
  const tags = tagsData?.data || [];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryIds: [],
      tagIds: [],
      accordionDetails: [{ title: 'Materials', content: '' }],
      variants: [
        {
          name: 'Default',
          price: 0,
          stock: 0,
          subscriptionEligible: false,
          subscriptionDiscount: 0,
        },
      ],
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: 'variants',
  });

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 5 - productImages.length);
    setProductImages([...productImages, ...newFiles]);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ProductFormValues) => {
    const formData = new FormData();
    // Append core product data as JSON string
    formData.append(
      'data',
      JSON.stringify({
        name: data.name,
        description: data.description,
        isFeatured: false,
        categoryIds: data.categoryIds,
        tagIds: data.tagIds,
        accordionDetails: data.accordionDetails,
        variants: data.variants,
      }),
    );

    // Append images
    productImages.forEach((file) => {
      formData.append('images', file);
    });

    addProduct(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='py-8 px-4 sm:px-6 flex flex-col rounded-[10px]'
    >
      <div className='max-w-4xl'>
        <div className='space-y-6'>
          {/* General Information */}
          <div className='bg-white p-6 rounded-lg border border-[#E7E5E4] space-y-4 shadow-sm'>
            <h2 className='text-lg font-semibold'>General Information</h2>

            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>Product Name</label>
              <input
                {...register('name')}
                placeholder='Enter product name'
                className='w-full px-3 py-2.5 border border-[#E7E5E4] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#1e2d4a]'
              />
              {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
            </div>

            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>Description</label>
              <textarea
                {...register('description')}
                placeholder='Enter short product description'
                rows={4}
                className='w-full px-3 py-2.5 border border-[#E7E5E4] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] resize-none'
              />
              {errors.description && (
                <p className='text-red-500 text-xs mt-1'>{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Classification (Categories & Tags) */}
          <div className='bg-white p-6 rounded-lg border border-[#E7E5E4] space-y-4 shadow-sm'>
            <h2 className='text-lg font-semibold'>Classification</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm text-(--text-primary) mb-1.5'>Categories</label>
                <Controller
                  name='categoryIds'
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={categories}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder='Select categories'
                    />
                  )}
                />
                {errors.categoryIds && (
                  <p className='text-red-500 text-xs mt-1'>{errors.categoryIds.message}</p>
                )}
              </div>

              <div>
                <label className='block text-sm text-(--text-primary) mb-1.5'>Tags</label>
                <Controller
                  name='tagIds'
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={tags}
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder='Select tags'
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className='bg-white p-6 rounded-lg border border-[#E7E5E4] shadow-sm'>
            <h2 className='text-lg font-semibold mb-4'>Product Images</h2>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-md p-12 text-center cursor-pointer transition-colors ${
                dragActive
                  ? 'border-[#1e2d4a] bg-blue-50'
                  : 'border-[#E7E5E4] hover:border-[#1e2d4a]'
              }`}
            >
              <div className='flex flex-col items-center justify-center'>
                <div className='text-4xl mb-3 text-gray-400'>+</div>
              </div>
              <input
                ref={fileInputRef}
                type='file'
                multiple
                accept='image/*'
                onChange={(e) => handleImageUpload(e.target.files)}
                className='hidden'
              />
            </div>
            {productImages.length > 0 && (
              <div className='flex gap-4 mt-4 overflow-x-auto py-2'>
                {productImages.map((file, i) => (
                  <div
                    key={i}
                    className='relative w-20 h-20 shrink-0 rounded-md border overflow-hidden'
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt='preview'
                      fill
                      className='object-cover'
                      unoptimized
                    />
                    <button
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(i);
                      }}
                      className='absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 text-red-500'
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Variants */}
          <div className='bg-white p-6 rounded-lg border border-[#E7E5E4] shadow-sm'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold'>Product Variants</h2>
              <button
                type='button'
                onClick={() =>
                  appendVariant({
                    name: '',
                    price: 0,
                    stock: 0,
                    subscriptionEligible: false,
                    subscriptionDiscount: 0,
                  })
                }
                className='flex items-center gap-1 text-sm bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800'
              >
                <Plus size={14} /> Add Variant
              </button>
            </div>

            <div className='space-y-4'>
              {variantFields.map((field, index) => (
                <div
                  key={field.id}
                  className='p-4 border border-[#E7E5E4] rounded-md relative bg-gray-50/50'
                >
                  {variantFields.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeVariant(index)}
                      className='absolute top-3 right-3 text-red-500 hover:text-red-700'
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2'>
                    <div>
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        Variant Name
                      </label>
                      <input
                        {...register(`variants.${index}.name`)}
                        className='w-full px-3 py-2 border rounded-md text-sm'
                        placeholder='e.g. Single Roll'
                      />
                      {errors.variants?.[index]?.name && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors.variants[index]?.name?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        Price ($)
                      </label>
                      <input
                        type='number'
                        step='0.01'
                        {...register(`variants.${index}.price`, { valueAsNumber: true })}
                        className='w-full px-3 py-2 border rounded-md text-sm'
                      />
                    </div>
                    <div>
                      <label className='block text-xs font-medium text-gray-700 mb-1'>Stock</label>
                      <input
                        type='number'
                        {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                        className='w-full px-3 py-2 border rounded-md text-sm'
                      />
                    </div>
                    <div>
                      <label className='block text-xs font-medium text-gray-700 mb-1'>
                        Sub. Discount (%)
                      </label>
                      <input
                        type='number'
                        {...register(`variants.${index}.subscriptionDiscount`, {
                          valueAsNumber: true,
                        })}
                        className='w-full px-3 py-2 border rounded-md text-sm'
                      />
                    </div>
                  </div>
                  <div className='mt-3 flex items-center gap-2'>
                    <input
                      type='checkbox'
                      id={`subEligible-${index}`}
                      {...register(`variants.${index}.subscriptionEligible`)}
                      className='rounded border-gray-300'
                    />
                    <label htmlFor={`subEligible-${index}`} className='text-sm text-gray-700'>
                      Eligible for Subscription
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col md:flex-row gap-x-4 mt-8'>
          <button
            type='button'
            className='px-6 py-3.5 sm:py-4 bg-[#FAFAF9] text-(--cart-panel-bg) font-semibold border border-[#E5E7EB] rounded-[10px] hover:bg-gray-100 active:scale-[0.98] transition-all duration-150'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isPending}
            className='px-6 py-3.5 sm:py-4 bg-black text-white font-semibold rounded-[10px] hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 disabled:opacity-70 flex-1 md:flex-none'
          >
            {isPending ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>
    </form>
  );
}
