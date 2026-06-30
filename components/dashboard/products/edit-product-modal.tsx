"use client";

import {
  ChevronsRight,
  Maximize2,
  X,
  Package,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MultiSelect } from "@/components/shared/multi-select";
import { useCategories, useTags, useUpdateProduct } from "@/hooks/useProducts";
import type { BackendProduct } from "./product-list";

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
        id: z.string().optional(),
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

export interface EditProductModalProps {
  product: BackendProduct;
  onClose: () => void;
  onDelete?: () => void;
}

export default function EditProductModal({
  product,
  onClose,
  onDelete,
}: EditProductModalProps) {
  const [existingImages, setExistingImages] = useState<string[]>(product.images || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: categoriesData } = useCategories();
  const { data: tagsData } = useTags();
  const { mutate: updateProduct, isPending } = useUpdateProduct();

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
      name: product.name || "",
      description: product.description || "",
      categoryIds: product.categories?.map(c => c.id) || [],
      tagIds: product.tags?.map(t => t.id) || [],
      accordionDetails: product.accordionDetails?.length ? product.accordionDetails : [],
      variants: product.variants?.length ? product.variants : [{
        name: 'Default',
        price: 0,
        stock: 0,
        subscriptionEligible: false,
        subscriptionDiscount: 0,
      }],
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

  const {
    fields: accordionFields,
    append: appendAccordion,
    remove: removeAccordion,
  } = useFieldArray({
    control,
    name: 'accordionDetails',
  });

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const currentTotal = existingImages.length + newImages.length;
    const allowedNew = 5 - currentTotal;
    const addedFiles = Array.from(files).slice(0, allowedNew);
    setNewImages([...newImages, ...addedFiles]);
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

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ProductFormValues) => {
    const formData = new FormData();
    formData.append(
      'data',
      JSON.stringify({
        name: data.name,
        description: data.description,
        isFeatured: product.isFeatured,
        categoryIds: data.categoryIds,
        tagIds: data.tagIds,
        accordionDetails: data.accordionDetails,
        variants: data.variants,
        images: existingImages, // Sent as `images` so the backend route merges it with new fileUrls
      }),
    );

    newImages.forEach((file) => {
      formData.append('images', file);
    });

    updateProduct(
      { id: product.id, formData },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  return (
    <section
      className='fixed inset-0 z-50 flex justify-end p-3'
      onClick={onClose}>
      {/* Backdrop */}
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />

      {/* Panel */}
      <div
        className='relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        onClick={(e) => e.stopPropagation()}>
        
        {/* ── Top icon bar ── */}
        <div className='flex items-center justify-between px-4 pt-4 pb-3'>
          <div className='flex items-center gap-1'>
            <button
              type='button'
              onClick={onClose}
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
              <ChevronsRight className='w-4 h-4 text-[#262626]' />
            </button>
            <button
              type='button'
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
              <Maximize2 className='w-3 h-3 text-[#262626]' />
            </button>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
            <X className='w-4 h-4 text-[#8A8A8A]' />
          </button>
        </div>

        {/* ── Title row ── */}
        <div className='px-5 pb-4 flex items-start justify-between'>
          <div>
            <h2 className='text-2xl font-medium text-[#2B2D2E] leading-tight'>
              Edit Product
            </h2>
            <div className='flex items-center gap-2 mt-1'>
              <p className='text-[13px] text-[#8A8A8A]'>
                SKU: {product.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
          {onDelete && (
            <button
              type='button'
              onClick={() => {
                onClose();
                onDelete();
              }}
              className='h-8 px-3.5 rounded-[6px] border border-[#E5E7EB] text-[13px] bg-[#FAFAF9] text-[#1D3A5F] hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors cursor-pointer mt-0.5'>
              Delete Product
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 px-5 pb-5">
          {/* ── General Info Form card ── */}
          <div className='bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4 mb-5'>
            <div className='mb-2'>
              <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1 shadow-sm'>
                <Package className='w-4 h-4 text-[#008236]' />
                General Information
              </span>
            </div>

            <div>
              <label className='block text-[13px] font-medium text-[#2B2D2E] mb-1.5'>Product Name</label>
              <input
                {...register('name')}
                placeholder='Enter product name'
                className='w-full h-9.5 border border-[#E5E5E5] rounded-[6px] px-3 text-[13px] text-[#2B2D2E] placeholder:text-[#979191] outline-none focus:border-[#A0A0A0] transition-colors bg-white'
              />
              {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
            </div>

            <div>
              <label className='block text-[13px] font-medium text-[#2B2D2E] mb-1.5'>Description</label>
              <textarea
                {...register('description')}
                placeholder='Product description...'
                rows={4}
                className='w-full border border-[#E5E5E5] rounded-[6px] px-3 py-2 text-[13px] text-[#2B2D2E] placeholder:text-[#C0C0C0] outline-none focus:border-[#A0A0A0] transition-colors bg-white resize-none'
              />
              {errors.description && <p className='text-red-500 text-xs mt-1'>{errors.description.message}</p>}
            </div>
          </div>

          {/* ── Classification Form card ── */}
          <div className='bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4 mb-5'>
             <div className='mb-2'>
              <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1 shadow-sm'>
                Classification
              </span>
            </div>

            <div>
              <label className='block text-[13px] font-medium text-[#2B2D2E] mb-1.5'>Categories</label>
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
              {errors.categoryIds && <p className='text-red-500 text-xs mt-1'>{errors.categoryIds.message}</p>}
            </div>

            <div>
              <label className='block text-[13px] font-medium text-[#2B2D2E] mb-1.5'>Tags</label>
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

          {/* ── Media Form card ── */}
          <div className='bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4 mb-5'>
            <div className='mb-2'>
              <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1 shadow-sm'>
                Product Images
              </span>
            </div>
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`w-full border-2 border-dashed rounded-[6px] p-8 text-center cursor-pointer transition-colors bg-white ${
                dragActive ? 'border-blue-400 bg-blue-50' : 'border-[#E5E5E5] hover:border-gray-400'
              }`}
            >
              <div className='text-3xl mb-2 text-gray-400'>+</div>
              <p className="text-[13px] text-gray-500">Drag & drop or click to upload</p>
              <input
                ref={fileInputRef}
                type='file'
                multiple
                accept='image/*'
                onChange={(e) => handleImageUpload(e.target.files)}
                className='hidden'
              />
            </div>
            
            {(existingImages.length > 0 || newImages.length > 0) && (
              <div className='flex gap-3 mt-2 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                {/* Render Existing */}
                {existingImages.map((url, i) => (
                  <div key={`existing-${i}`} className='relative w-20 h-20 shrink-0 rounded-md border border-[#E5E5E5] overflow-hidden bg-white'>
                    <Image src={url} alt='preview' fill className='object-cover' unoptimized />
                    <button
                      type='button'
                      onClick={(e) => { e.stopPropagation(); removeExistingImage(i); }}
                      className='absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow-sm hover:bg-white text-red-500 backdrop-blur-sm'
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                {/* Render New */}
                {newImages.map((file, i) => (
                  <div key={`new-${i}`} className='relative w-20 h-20 shrink-0 rounded-md border border-[#E5E5E5] overflow-hidden bg-white'>
                    <Image src={URL.createObjectURL(file)} alt='preview' fill className='object-cover' unoptimized />
                    <button
                      type='button'
                      onClick={(e) => { e.stopPropagation(); removeNewImage(i); }}
                      className='absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow-sm hover:bg-white text-red-500 backdrop-blur-sm'
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Variants Form card ── */}
          <div className='bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4 mb-5'>
            <div className='flex justify-between items-center mb-2'>
              <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1 shadow-sm'>
                Product Variants
              </span>
              <button
                type='button'
                onClick={() =>
                  appendVariant({ name: '', price: 0, stock: 0, subscriptionEligible: false, subscriptionDiscount: 0 })
                }
                className='flex items-center gap-1 text-[12px] font-medium bg-black text-white px-2.5 py-1.5 rounded-md hover:bg-gray-800'
              >
                <Plus size={14} /> Add Variant
              </button>
            </div>

            <div className='space-y-4'>
              {variantFields.map((field, index) => (
                <div key={field.id} className='p-4 border border-[#E5E5E5] rounded-md relative bg-white'>
                  {variantFields.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeVariant(index)}
                      className='absolute top-3 right-3 text-red-500 hover:text-red-700'
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1 pr-6'>
                    <div>
                      <label className='block text-[12px] font-medium text-gray-700 mb-1'>Variant Name</label>
                      <input
                        {...register(`variants.${index}.name`)}
                        className='w-full px-3 py-2 border border-[#E5E5E5] rounded-md text-[13px]'
                        placeholder='e.g. Single Roll'
                      />
                      {errors.variants?.[index]?.name && <p className='text-red-500 text-xs mt-1'>{errors.variants[index]?.name?.message}</p>}
                    </div>
                    <div>
                      <label className='block text-[12px] font-medium text-gray-700 mb-1'>Price ($)</label>
                      <input
                        type='number'
                        step='0.01'
                        {...register(`variants.${index}.price`, { valueAsNumber: true })}
                        className='w-full px-3 py-2 border border-[#E5E5E5] rounded-md text-[13px]'
                      />
                    </div>
                    <div>
                      <label className='block text-[12px] font-medium text-gray-700 mb-1'>Stock</label>
                      <input
                        type='number'
                        {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                        className='w-full px-3 py-2 border border-[#E5E5E5] rounded-md text-[13px]'
                      />
                    </div>
                    <div>
                      <label className='block text-[12px] font-medium text-gray-700 mb-1'>Sub. Discount (%)</label>
                      <input
                        type='number'
                        {...register(`variants.${index}.subscriptionDiscount`, { valueAsNumber: true })}
                        className='w-full px-3 py-2 border border-[#E5E5E5] rounded-md text-[13px]'
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
                    <label htmlFor={`subEligible-${index}`} className='text-[13px] text-gray-700'>
                      Eligible for Subscription
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Accordion Details Form card ── */}
          <div className='bg-[#FBFAF9] border border-[#E5E5E5] rounded-[10px] px-5 py-5 flex flex-col gap-4 mb-5'>
            <div className='flex justify-between items-center mb-2'>
              <span className='inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2D2E] bg-white border border-[#E5E5E5] rounded-[10px] px-3 py-1 shadow-sm'>
                Accordion Details
              </span>
              <button
                type='button'
                onClick={() => appendAccordion({ title: '', content: '' })}
                className='flex items-center gap-1 text-[12px] font-medium bg-black text-white px-2.5 py-1.5 rounded-md hover:bg-gray-800'
              >
                <Plus size={14} /> Add Detail
              </button>
            </div>

            <div className='space-y-4'>
              {accordionFields.map((field, index) => (
                <div key={field.id} className='p-4 border border-[#E5E5E5] rounded-md relative bg-white'>
                  <button
                    type='button'
                    onClick={() => removeAccordion(index)}
                    className='absolute top-3 right-3 text-red-500 hover:text-red-700'
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className='grid grid-cols-1 gap-4 mt-1 pr-6'>
                    <div>
                      <label className='block text-[12px] font-medium text-gray-700 mb-1'>Title</label>
                      <input
                        {...register(`accordionDetails.${index}.title`)}
                        className='w-full px-3 py-2 border border-[#E5E5E5] rounded-md text-[13px]'
                        placeholder='e.g. Materials'
                      />
                    </div>
                    <div>
                      <label className='block text-[12px] font-medium text-gray-700 mb-1'>Content</label>
                      <textarea
                        {...register(`accordionDetails.${index}.content`)}
                        rows={3}
                        className='w-full px-3 py-2 border border-[#E5E5E5] rounded-md text-[13px] resize-none'
                        placeholder='e.g. 100% plant-based'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Actions ── */}
          <div className='mt-auto pt-6 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='h-10 px-5 rounded-[8px] border border-[#E5E7EB] text-[14px] font-medium bg-white text-[#1D3A5F] hover:bg-gray-50 transition-colors cursor-pointer'>
              Cancel
            </button>
            <button
              type='submit'
              disabled={isPending}
              className='h-10 px-6 rounded-[8px] text-[14px] font-medium bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-70 shadow-sm'>
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
