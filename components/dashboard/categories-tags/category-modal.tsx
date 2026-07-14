"use client";

import React, { useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategoryTag";
import type { Category } from "./category-list";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

export default function CategoryModal({ isOpen, onClose, category }: CategoryModalProps) {
  const isEditing = !!category;
  
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description || "",
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [category, reset]);

  const onSubmit = (data: CategoryFormValues) => {
    if (isEditing) {
      updateCategory(
        { id: category.id, data },
        { onSuccess: onClose }
      );
    } else {
      createCategory(data, { onSuccess: onClose });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-[12px] shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#1e2d4a]">
            {isEditing ? "Edit Category" : "Add New Category"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Category Name *
              </label>
              <input
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-[14px] focus:outline-none focus:border-[#1e2d4a] focus:ring-1 focus:ring-[#1e2d4a]"
                placeholder="e.g. Cleansing Wipes"
              />
              {errors.name && (
                <p className="text-red-500 text-[12px] mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Description <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-[8px] text-[14px] focus:outline-none focus:border-[#1e2d4a] focus:ring-1 focus:ring-[#1e2d4a] resize-none"
                placeholder="Brief description about the category"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 text-[14px] font-medium text-gray-600 hover:bg-gray-100 rounded-[8px] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 text-[14px] font-medium text-white bg-[#010101] hover:bg-black/90 rounded-[8px] transition-colors disabled:opacity-70"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
