import { ChevronsRight, Group, Save } from "lucide-react";
import Image from "next/image";

export default function CRMEditModal({
  isOpen,
  onClose,
  section,
  title,
  subtitle,
  imagePaths,
}: {
  isOpen: boolean;
  onClose: () => void;
  section: string | null;
  title: string | null;
  subtitle: string | null;
  imagePaths: string[] | null;
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const columnNames = ["Title", "Subtitle", "Images"];
  const columnValues = [title, subtitle, imagePaths?.join(", ") || "-"];
  return (
    <section
      className='fixed inset-0 flex justify-end z-50 p-3'
      onClick={handleOverlayClick}>
      {/* Blur overlay */}
      <div className='absolute inset-0 backdrop-blur-sm bg-black/20' />

      {/* Panel */}
      <div
        className='relative z-10 w-full max-w-xl bg-white rounded-[10px] h-full overflow-y-auto shadow-2xl flex flex-col p-4'
        onClick={(e) => e.stopPropagation()}>
        {/* Upper Buttons */}
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-md hover:bg-gray-100 transition-colors text-gray-400'>
            <ChevronsRight className='w-6 h-6' color='#262626' />
          </button>
        </div>

        {/* Content */}
        <div className='p-2'>
          <p className='text-[#2B2D2E] text-2xl'>Section</p>
          <p className='text-[#A8A29E] text-sm'>{section}</p>
          <div>
            <div>
              {columnNames.map((colName, index) => (
                <div key={index} className='flex items-start gap-2 mt-4'>
                  <div className='flex items-center gap-1'>
                    <Group className='w-4 h-4 inline-flex items-center justify-center mr-2 text-[#A3A3A3]' />
                    <p className='text-[#737373] text-sm w-20'>{colName}:</p>
                  </div>
                  <div className='text-[#262626] text-sm flex-1 wrap-break-words'>
                    {colName === "Images" && imagePaths ? (
                      <div className='flex flex-wrap gap-2'>
                        {imagePaths.map((path, idx) => (
                          <Image
                            key={idx}
                            src={path}
                            alt={`Image ${idx + 1}`}
                            width={400}
                            height={400}
                          />
                        ))}
                      </div>
                    ) : (
                      columnValues[index] || "-"
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className='flex justify-end items-center mt-10'>
              <button className='bg-[#FAFAF9] text-[#262626] py-2 px-4 rounded-md hover:bg-[#f1f1eb] border border-[#E5E7EB]'>
                <Save className='w-4 h-4 inline-flex items-center justify-center mr-2' />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
