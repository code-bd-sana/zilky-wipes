import { ChevronsRight, Group, Maximize2, Save, X } from "lucide-react";
import { useState } from "react";

type FormField = {
  name: string;
  label: string;
  type: "text" | "select" | "textarea";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
};

type CRMAddModalProps = {
  isOpen: boolean;
  onClose: () => void;
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  title?: string;
};

export default function CRMAddModal({
  isOpen,
  onClose,
  fields,
  onSubmit,
  title = "Add New Item",
}: CRMAddModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach((field) => {
      initial[field.name] = "";
    });
    return initial;
  });

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    const isValid = fields.every(
      (field) => !field.required || formData[field.name],
    );

    if (!isValid) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({});
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <section
      className='fixed inset-0 flex justify-end z-50 p-3'
      onClick={handleOverlayClick}>
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />

      <div
        className='relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col p-4'
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
              <ChevronsRight className='w-5 h-5 text-gray-600' />
            </button>
            <button
              type='button'
              onClick={onClose}
              className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
              <Maximize2 className='w-4 h-4 text-gray-600' />
            </button>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 transition-colors'>
            <X className='w-4 h-4 text-gray-600' />
          </button>
        </div>

        <h2 className='text-2xl mb-2 text-[#2B2D2E]'>{title}</h2>
        {/* Form Fields */}
        <div className='space-y-4 px-3 py-6 bg-[#FBFAF9] border border-[#E5E5E5] rounded-[8px]'>
          {fields.map((field) => (
            <div key={field.name}>
              <label className='block text-sm font-medium text-[#737373] mb-1.5'>
                {field.label}
                {field.required && <span className='text-red-500 ml-1'>*</span>}
              </label>

              {field.type === "select" ? (
                <select
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className='w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#262626] outline-none focus:border-[#d4d4d4] focus:ring-1 focus:ring-gray-200'>
                  <option value=''>Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className='w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#262626] outline-none focus:border-[#d4d4d4] focus:ring-1 focus:ring-gray-200 resize-none'
                />
              ) : (
                <input
                  type='text'
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className='w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#262626] outline-none focus:border-[#d4d4d4] focus:ring-1 focus:ring-gray-200'
                />
              )}
            </div>
          ))}
        </div>
        <div className='my-6 flex-row gap-y-6 max-w-65'>
          <div className='flex justify-between '>
            <p className='flex items-center gap-2 text-[#737373]'>
              <Group size={20} color='#A3A3A3' />
              Status
            </p>
            <p>Active</p>
          </div>
          <div className='flex justify-between'>
            <p className='flex items-center gap-2 text-[#737373]'>
              <Group size={20} color='#A3A3A3' />
              Created
            </p>
            <p>-</p>
          </div>
          <div className='flex justify-between'>
            <p className='flex items-center gap-2 text-[#737373]'>
              <Group size={20} color='#A3A3A3' />
              Modified
            </p>
            <p>-</p>
          </div>
        </div>

        {/* Footer */}
        <div className='flex mt-auto justify-end gap-3 pt-4 border-t border-[#E5E7EB]'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 text-sm text-[#737373] hover:text-[#262626] transition-colors'>
            Cancel
          </button>
          <button
            type='button'
            onClick={handleSubmit}
            className='bg-[#FAFAF9] text-[#262626] py-2 px-4 rounded-md hover:bg-[#f1f1eb] border border-[#E5E7EB] transition-colors flex items-center gap-2'>
            <Save className='w-4 h-4' />
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
}
