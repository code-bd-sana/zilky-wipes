import { ChevronsRight, Save, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  title: string;
  subtitle: string;
  imagePaths: { url: string }[];
};

export default function CRMHomeEditModal({
  isOpen,
  onClose,
  sectionKey,
  sectionName,
  initialContent,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  sectionKey: string | null;
  sectionName: string | null;
  initialContent: any;
  onSave: (sectionKey: string, content: any) => Promise<void>;
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      subtitle: "",
      imagePaths: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "imagePaths",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialContent?.title || "",
        subtitle: initialContent?.subtitle || "",
        imagePaths: (initialContent?.imagePaths || []).map((url: string) => ({
          url,
        })),
      });
    }
  }, [isOpen, initialContent, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: FormValues) => {
    if (!sectionKey) return;
    try {
      const formattedContent = {
        title: data.title,
        subtitle: data.subtitle,
        imagePaths: data.imagePaths.map((img) => img.url).filter(Boolean),
      };
      await onSave(sectionKey, formattedContent);
      toast.success("Section updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update section");
    }
  };

  return (
    <section
      className="fixed inset-0 flex justify-end z-50 p-3"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400"
          >
            <ChevronsRight className="w-6 h-6" color="#262626" />
          </button>
        </div>

        <div className="flex-1 px-2">
          <p className="text-[#2B2D2E] text-2xl font-semibold mb-1">Edit Section</p>
          <p className="text-[#A8A29E] text-sm mb-6">{sectionName}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                {...register("title")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Section title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle / Content
              </label>
              <textarea
                {...register("subtitle")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black min-h-25"
                placeholder="Section subtitle or main text"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Media URLs (Images/Videos)
                </label>
                <button
                  type="button"
                  onClick={() => append({ url: "" })}
                  className="text-sm flex items-center text-blue-600 hover:text-blue-800"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Media
                </button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    {...register(`imagePaths.${index}.url` as const)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {fields.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {fields.map((field, index) => {
                    return (
                      <div key={`preview-${index}`} className="w-16 h-16 bg-gray-100 border rounded flex items-center justify-center overflow-hidden">
                         <ImageIconPreview />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mt-10 border-t pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#FAFAF9] text-[#262626] py-2 px-4 rounded-md hover:bg-[#f1f1eb] border border-[#E5E7EB] disabled:opacity-50"
          >
            <Save className="w-4 h-4 inline-flex items-center justify-center mr-2" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}

function ImageIconPreview() {
  return (
    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
