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
  detailList: { title: string; description: string }[];
  statList: { value: string; title: string; description: string }[];
  advantageList: { label: string; zilkyType: string; zilkyText: string; tpType: string; tpText: string; wwType: string; wwText: string }[];
};

export default function CRMDynamicEditModal({
  isOpen,
  onClose,
  sectionKey,
  sectionName,
  initialContent,
  pageKey = "benefits",
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
      detailList: [],
      statList: [],
      advantageList: [],
    },
  });

  const { fields: pointsFields, append: appendPoint, remove: removePoint } = useFieldArray({ control, name: "points" });
  const { fields: detailFields, append: appendDetail, remove: removeDetail } = useFieldArray({ control, name: "detailList" });
  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({ control, name: "statList" });
  const { fields: advantageFields, append: appendAdvantage, remove: removeAdvantage } = useFieldArray({ control, name: "advantageList" });

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
        detailList: (initialContent?.detailList as { title: string; description: string }[]) || [],
        statList: (initialContent?.statList as { value: string; title: string; description: string }[]) || [],
        advantageList: (initialContent?.advantageList as { label: string; zilkyType: string; zilkyText: string; tpType: string; tpText: string; wwType: string; wwText: string }[]) || [],
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
        detailList: data.detailList,
        statList: data.statList,
        advantageList: data.advantageList,
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

  // Determine which list builders to show based on sectionKey (or if they already have data)
  const showPointsList = sectionKey === "difference" || pointsFields.length > 0;
  const showDetailList = sectionKey === "section-1" || sectionKey === "comfort" || sectionKey === "section-2" || detailFields.length > 0;
  const showStatList = sectionKey === "proven-results" || statFields.length > 0;
  const showAdvantageList = sectionKey === "advantage" || advantageFields.length > 0;
  
  // Exclude subtitle for certain sections if desired, but we can just leave it optional
  const hasSubtitle = sectionKey !== "hero" && sectionKey !== "footer-video" && sectionKey !== "advantage";

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

            {hasSubtitle && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Content</label>
                <textarea
                  {...register("subtitle")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black min-h-25"
                  placeholder="Section subtitle or main text"
                />
              </div>
            )}

            {showPointsList && (
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

            {showDetailList && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                <label className="block text-sm font-medium text-gray-700 mb-2">Detail Items (Title & Description)</label>
                <div className="space-y-3 mb-3">
                  {detailFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start bg-white p-3 border border-gray-200 rounded-md">
                      <div className="flex-1 space-y-2">
                        <input
                          {...register(`detailList.${index}.title`)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="Title"
                        />
                        <textarea
                          {...register(`detailList.${index}.description`)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black min-h-15"
                          placeholder="Description"
                        />
                      </div>
                      <button type="button" onClick={() => removeDetail(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md mt-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => appendDetail({ title: "", description: "" })} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>
            )}

            {showStatList && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                <label className="block text-sm font-medium text-gray-700 mb-2">Stat Items (Value, Title & Description)</label>
                <div className="space-y-3 mb-3">
                  {statFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-start bg-white p-3 border border-gray-200 rounded-md">
                      <div className="flex-1 space-y-2">
                        <input
                          {...register(`statList.${index}.value`)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="Value (e.g., 99.9%)"
                        />
                        <input
                          {...register(`statList.${index}.title`)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                          placeholder="Title"
                        />
                        <textarea
                          {...register(`statList.${index}.description`)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black min-h-15"
                          placeholder="Description"
                        />
                      </div>
                      <button type="button" onClick={() => removeStat(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md mt-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => appendStat({ value: "", title: "", description: "" })} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                  <Plus className="w-4 h-4" /> Add Stat
                </button>
              </div>
            )}

            {showAdvantageList && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50 overflow-x-auto">
                <label className="block text-sm font-medium text-gray-700 mb-2">Matrix Features</label>
                <div className="space-y-4 mb-3">
                  {advantageFields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-3 bg-white p-3 border border-gray-200 rounded-md relative">
                      <button type="button" onClick={() => removeAdvantage(index)} className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <input
                        {...register(`advantageList.${index}.label`)}
                        className="w-full sm:w-2/3 px-3 py-2 text-sm font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                        placeholder="Feature Name (e.g., Flushable & Safe)"
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Zilky */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500 uppercase">ZilkyWipes</label>
                          <select {...register(`advantageList.${index}.zilkyType`)} className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md">
                            <option value="check">Check (✓)</option>
                            <option value="cross">Cross (X)</option>
                            <option value="warn">Warning (!)</option>
                            <option value="stars">Stars</option>
                          </select>
                          <input {...register(`advantageList.${index}.zilkyText`)} className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md" placeholder="Text or Star count (e.g., 5)" />
                        </div>
                        {/* Toilet Paper */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500 uppercase">Toilet Paper</label>
                          <select {...register(`advantageList.${index}.tpType`)} className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md">
                            <option value="check">Check (✓)</option>
                            <option value="cross">Cross (X)</option>
                            <option value="warn">Warning (!)</option>
                            <option value="stars">Stars</option>
                          </select>
                          <input {...register(`advantageList.${index}.tpText`)} className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md" placeholder="Text or Star count" />
                        </div>
                        {/* Wet Wipes */}
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500 uppercase">Wet Wipes</label>
                          <select {...register(`advantageList.${index}.wwType`)} className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md">
                            <option value="check">Check (✓)</option>
                            <option value="cross">Cross (X)</option>
                            <option value="warn">Warning (!)</option>
                            <option value="stars">Stars</option>
                          </select>
                          <input {...register(`advantageList.${index}.wwText`)} className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md" placeholder="Text or Star count" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => appendAdvantage({ label: "", zilkyType: "check", zilkyText: "", tpType: "check", tpText: "", wwType: "cross", wwText: "Most aren't" })} className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
                  <Plus className="w-4 h-4" /> Add Matrix Feature
                </button>
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
