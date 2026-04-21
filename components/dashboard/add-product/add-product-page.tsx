"use client";

import { useState, useRef } from "react";
import { ImagePlus } from "lucide-react";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    productImages: [] as File[],
    price: "",
    stock: "",
    tag: "",
    discount: "",
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).slice(
      0,
      5 - formData.productImages.length,
    );
    setFormData({
      ...formData,
      productImages: [...formData.productImages, ...newFiles],
    });
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <section className='py-8 px-4 sm:px-6 flex flex-col rounded-[10px]'>
      <div className='max-w-280'>
        {/* Form Fields */}
        <div className='space-y-3 '>
          {/* Product Name */}
          <div>
            <label className='block text-sm text-(--text-primary) mb-1.5'>
              Product Name
            </label>
            <input
              type='text'
              name='productName'
              value={formData.productName}
              onChange={handleChange}
              placeholder='Enter product name '
              className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
            />
          </div>

          {/* Category */}
          <div>
            <label className='block text-sm text-(--text-primary) mb-1.5'>
              Category
            </label>
            <input
              type='text'
              name='category'
              value={formData.category}
              onChange={handleChange}
              placeholder='Select category'
              className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
            />
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm text-(--text-primary) mb-1.5'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Enter short product description'
              rows={6}
              className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors resize-none'
            />
          </div>

          {/* Product Images */}
          <div className='border rounded-[10px]'>
            <div className='p-4'>
              <label className=' text-sm text-(--text-primary) mb-1.5 flex items-center gap-2'>
                <ImagePlus size={18} />
                Product Images
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
                  dragActive
                    ? "border-[#1e2d4a] bg-blue-50"
                    : "border-[#E7E5E4] hover:border-[#1e2d4a]"
                }`}>
                <div className='flex flex-col items-center justify-center'>
                  <div className='text-4xl mb-3 text-gray-400'>+</div>
                  <p className='text-sm text-gray-500'>
                    Drag and drop images here or click to select
                  </p>
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
              <p className='text-xs text-gray-500 mt-2'>
                Add up to 5 images. First image will be the main photo.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Price */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Price
              </label>
              <input
                type='text'
                name='price'
                value={formData.price}
                onChange={handleChange}
                placeholder='Enter product price'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Stock Quantity
              </label>
              <input
                type='text'
                name='stock'
                value={formData.stock}
                onChange={handleChange}
                placeholder='Enter stock quantity'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            {/* Tags */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Tags
              </label>
              <input
                type='text'
                name='tags'
                value={formData.tag}
                onChange={handleChange}
                placeholder='Enter stock quantity'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>

            {/* Discount */}
            <div>
              <label className='block text-sm text-(--text-primary) mb-1.5'>
                Discount
              </label>
              <input
                type='text'
                name='discount'
                value={formData.discount}
                onChange={handleChange}
                placeholder='Enter discount percentage'
                className='w-full px-3 py-2.5 sm:py-3 border border-[#E7E5E4] rounded-md text-sm text-gray-400 placeholder-[#979191] focus:outline-none focus:ring-1 focus:ring-[#1e2d4a] focus:border-[#1e2d4a] transition-colors'
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-x-4'>
          <button
            onClick={handleSubmit}
            className='mt-7 sm:mt-8 px-10 py-3.5 sm:py-4 bg-white text-(--cart-panel-bg) font-semibold border border-[#E5E5E5] rounded-full hover:bg-blue-200  active:scale-[0.98] transition-all duration-150 text-base cursor-pointer'>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className='mt-7 sm:mt-8 px-10 py-3.5 sm:py-4 bg-(--cart-panel-bg) text-white font-semibold rounded-full hover:bg-[#16253d] active:scale-[0.98] transition-all duration-150 text-base cursor-pointer'>
            Save Product
          </button>
        </div>
      </div>
    </section>
  );
}
