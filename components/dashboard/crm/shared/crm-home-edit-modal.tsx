import { ChevronsRight, Save, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { uploadMedia } from "@/lib/api/pages";
import { isVideo } from "@/lib/utils";

type FormValues = {
  title: string;
  subtitle: string;
};

export default function CRMHomeEditModal({
  isOpen,
  onClose,
  sectionKey,
  sectionName,
  initialContent,
  pageKey,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  sectionKey: string | null;
  sectionName: string | null;
  initialContent: any;
  pageKey?: string;
  onSave: (sectionKey: string, content: any) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      subtitle: "",
    },
  });

  const [existingPaths, setExistingPaths] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialContent?.title || "",
        subtitle: initialContent?.subtitle || "",
      });
      setExistingPaths(initialContent?.imagePaths || []);
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
    // reset input so the same files can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!sectionKey) return;
    setIsUploading(true);
    try {
      let newlyUploadedUrls: string[] = [];
      if (selectedFiles.length > 0) {
        newlyUploadedUrls = await uploadMedia(pageKey || "homepage", selectedFiles);
      }

      const finalPaths = [...existingPaths, ...newlyUploadedUrls].filter(Boolean);

      const formattedContent = {
        title: data.title,
        subtitle: data.subtitle,
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media (Images/Videos)
              </label>
              
              {/* File Upload Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 font-medium">Click to upload media</p>
                <p className="text-xs text-gray-500 mt-1">Supports PNG, JPG, MP4</p>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,video/*"
                />
              </div>

              {/* Preview Area */}
              <div className="mt-4 space-y-3">
                {/* Existing media */}
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
                      <p className="text-sm text-gray-600 truncate max-w-50" title={path}>
                        {path.split('/').pop()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingPath(idx)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )})}

                {/* New selected files */}
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
                      <p className="text-sm text-gray-600 truncate max-w-50" title={file.name}>
                        {file.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(idx)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
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
