import SpinningLoader from "@/components/loader";
import { UploadCloud } from "lucide-react";

const ImageUploadField = ({
  handleImageUpload,
  field,
  imageFile,
  fileUploading,
  initialImageUrl,
}: {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<string>;
  field: { onChange: (value: string) => void };
  imageFile: File | null;
  fileUploading: boolean;
  initialImageUrl: string | undefined;
}) => {
  return (
    <div className="w-full flex justify-center">
      <input
        type="file"
        onChange={async (e) => {
          const fileUrl = await handleImageUpload(e);
          // e.target.value = fileUrl;
          field.onChange(fileUrl);
        }}
        className="hidden"
        id="boardImage"
        accept="image/*"
      />
      <label htmlFor="boardImage">
        {imageFile ? (
          <div className="group relative flex flex-col justify-center items-center gap-2 bg-gray-100 p-2 rounded-md cursor-pointer h-[100px] w-[100px] text-center overflow-hidden">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Board Image"
              className="h-[100px] w-[100px] object-cover rounded-md"
            />
            {fileUploading && (
              <span className="absolute bottom-0 transform transition-all duration-200 ease-in-out">
                <div className="flex flex-col justify-center items-center gap-2 bg-gray-500/50 p-2 rounded-md cursor-pointer h-[100px] w-[100px] text-center text-white">
                  <SpinningLoader />
                  <span>Image Uploading ..</span>
                </div>
              </span>
            )}
            <span className="absolute bottom-0 transform translate-y-full transition-all duration-200 ease-in-out group-hover:-translate-y-0 ">
              <div className="flex flex-col justify-center items-center gap-2 bg-gray-500/50 p-2 rounded-md cursor-pointer h-[100px] w-[100px] text-center text-white">
                <UploadCloud className="h-5 w-5" />
                <span>Upload Image</span>
              </div>
            </span>
          </div>
        ) : initialImageUrl ? (
          <div className="group relative flex flex-col justify-center items-center gap-2 bg-gray-100 p-2 rounded-md cursor-pointer h-[100px] w-[100px] text-center overflow-hidden">
            <img
              src={initialImageUrl}
              alt="Board Image"
              className="h-[100px] w-[100px] object-cover rounded-md"
            />
            <span className="absolute bottom-0 transform translate-y-full transition-all duration-200 ease-in-out group-hover:-translate-y-0 ">
              <div className="flex flex-col justify-center items-center gap-2 bg-gray-500/50 p-2 rounded-md cursor-pointer h-[100px] w-[100px] text-center text-white">
                <UploadCloud className="h-5 w-5" />
                <span>Upload Image</span>
              </div>
            </span>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2 bg-gray-100 p-2 rounded-md cursor-pointer h-[100px] w-[100px] text-center">
            <UploadCloud className="h-5 w-5" />
            <span>Upload Image</span>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploadField;
