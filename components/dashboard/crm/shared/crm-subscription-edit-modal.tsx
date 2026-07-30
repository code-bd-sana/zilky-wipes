import { ChevronsRight, Save, Trash2, UploadCloud, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { uploadMedia } from "@/lib/api/pages";
import { isVideo } from "@/lib/utils";

type FormValues = {
  title: string;
  subtitle: string;
  points: { value: string }[];
  col1Points: { value: string }[];
  col2Points: { value: string }[];
};

export default function CRMSubscriptionEditModal({
  isOpen,
  onClose,
  sectionKey,
  sectionName,
  initialContent,
  pageKey = "subscription",
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  sectionKey: string | null;
  sectionName: string | null;
  initialContent: Record<string, unknown> | null;
  pageKey?: string;
  onSave: (sectionKey: string, content: Record<string, unknown>) => Promise<void>;
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
      points: [],
      col1Points: [],
      col2Points: [],
    },
  });

  const { fields: pointsFields, append: appendPoint, remove: removePoint } = useFieldArray({ control, name: "points" });
  const { fields: col1Fields, append: appendCol1, remove: removeCol1 } = useFieldArray({ control, name: "col1Points" });
  const { fields: col2Fields, append: appendCol2, remove: removeCol2 } = useFieldArray({ control, name: "col2Points" });

  const [existingPaths, setExistingPaths] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      reset({
        title: (initialContent?.title as string) || "",
        subtitle: (initialContent?.subtitle as string) || "",
        points: ((initialContent?.points as string[]) || []).map((p: string) => ({ value: p })),
        col1Points: ((initialContent?.col1Points as string[]) || []).map((p: string) => ({ value: p })),
        col2Points: ((initialContent?.col2Points as string[]) || []).map((p: string) => ({ value: p })),
      });
      setExistingPaths((initialContent?.imagePaths as string[]) || []);
      setSelectedFiles([]);
    }
  }, [isOpen, initialContent, reset]);

  if (!isOpen) return null;

  const removeExistingPath = (index: number) => {
    const updated = [...existingPaths];
    updated.splice(index, 1);
    setExistingPaths(updated);
  };

  const removeSelectedFile = (index: number) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: FormValues) => {
    if (!sectionKey) return;
    setIsUploading(true);
    try {
      let newlyUploadedUrls: string[] = [];
      if (selectedFiles.length > 0) {
        newlyUploadedUrls = await uploadMedia(pageKey, selectedFiles);
      }

      const finalPaths = [...existingPaths, ...newlyUploadedUrls].filter(Boolean);

      const formattedContent = {
        title: data.title,
        subtitle: data.subtitle,
        points: data.points.map(p => p.value),
        col1Points: data.col1Points.map(p => p.value),
        col2Points: data.col2Points.map(p => p.value),
        imagePaths: finalPaths,
      };

      await onSave(sectionKey, formattedContent);
      toast.success("Section updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update section");
    } finally {
      setIsUploading(false);
    }
  };

  const isFormLoading = isSubmitting || isUploading;

  const hasPointsList = sectionKey === "section-1";
  const hasDifferenceList = sectionKey === "difference";

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

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                {...register("title")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Section title"
              />
            </div>

            {!hasDifferenceList && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Content</label>
                <textarea
                  {...register("subtitle")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black min-h-25"
                  placeholder="Section subtitle or main text"
                />
              </div>
            )}

            {hasPointsList && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bullet Points</label>
                <div className="space-y-2 mb-3">
                  {pointsFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <input
                        {...register(`points.${index}.value`)}
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        placeholder={`Point ${index + 1}`}
                      />
                      <button type="button" onClick={() => removePoint(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => appendPoint({ value: "" })} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                  <Plus className="w-4 h-4" /> Add Point
                </button>
              </div>
            )}

            {hasDifferenceList && (
              <div className="grid grid-cols-1 gap-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                  <label className="block text-sm font-medium text-gray-700 mb-2">One-Time Purchase Points</label>
                  <div className="space-y-2 mb-3">
                    {col1Fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <input
                          {...register(`col1Points.${index}.value`)}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder={`Point ${index + 1}`}
                        />
                        <button type="button" onClick={() => removeCol1(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => appendCol1({ value: "" })} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                    <Plus className="w-4 h-4" /> Add Point
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Points</label>
                  <div className="space-y-2 mb-3">
                    {col2Fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <input
                          {...register(`col2Points.${index}.value`)}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder={`Point ${index + 1}`}
                        />
                        <button type="button" onClick={() => removeCol2(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => appendCol2({ value: "" })} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                    <Plus className="w-4 h-4" /> Add Point
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Media (Images/Videos)</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 font-medium">Click to upload media</p>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,video/*"
                />
              </div>

              <div className="mt-4 space-y-3">
                {existingPaths.map((path, idx) => {
                  const renderVideo = isVideo(path);
                  return (
                  <div key={`existing-${idx}`} className="flex items-center justify-between p-2 border rounded-md bg-white">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 bg-gray-100 shrink-0 border rounded flex items-center justify-center overflow-hidden relative">
                         {renderVideo ? (
                           <video src={path} className="object-cover w-full h-full" muted playsInline />
                         ) : (
                           <Image src={path.startsWith('/') || path.startsWith('http') ? path : '/ZilkyWipes/1000308870.png'} alt="preview" fill className="object-cover w-full h-full" />
                         )}
                      </div>
                      <p className="text-sm text-gray-600 truncate max-w-50">{path.split('/').pop()}</p>
                    </div>
                    <button type="button" onClick={() => removeExistingPath(idx)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )})}

                {selectedFiles.map((file, idx) => {
                  const objectUrl = URL.createObjectURL(file);
                  const renderVideo = file.type.startsWith('video/');
                  return (
                  <div key={`new-${idx}`} className="flex items-center justify-between p-2 border border-blue-100 rounded-md bg-blue-50/50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 bg-white shrink-0 border border-blue-100 rounded flex items-center justify-center overflow-hidden relative">
                        {renderVideo ? (
                          <video src={objectUrl} className="object-cover w-full h-full" muted playsInline />
                        ) : (
                          <Image src={objectUrl} alt="preview" fill className="object-cover w-full h-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate max-w-50">{file.name}</p>
                    </div>
                    <button type="button" onClick={() => removeSelectedFile(idx)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )})}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mt-10 border-t pt-4">
          <button
            type="submit"
            disabled={isFormLoading}
            className="bg-[#FAFAF9] text-[#262626] py-2 px-4 rounded-md hover:bg-[#f1f1eb] border border-[#E5E7EB] disabled:opacity-50 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isUploading ? "Uploading..." : isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
