/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useUploadMultipleFileMutation } from "@/redux/features/upload/upload.api";
import { ChangeEvent, DragEvent, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "sonner";

interface IProps {
  onFileUpload?: (file: File[] | null) => void;
  onChange: (file: string[] | null) => void;
  defaultImages?: string[];
}

const imageDisplay = (preview: File | string, onRemove: () => void) => {
  return (
    <div className="center border-input relative h-[150px] w-[150px] shrink-0 rounded-[8px] border-[1px]">
      <img
        width={150}
        height={150}
        src={typeof preview === "string" ? preview : URL.createObjectURL(preview)}
        alt={"saved image"}
        className="h-auto max-h-full w-full rounded-lg object-cover shadow-md"
      />

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 h-[16px] w-[16px] rounded-full bg-danger text-xs text-white"
        title="Remove image"
      >
        &times;
      </button>
    </div>
  );
};

const ProductImageUploader: React.FC<IProps> = ({ onFileUpload, onChange, defaultImages = [] }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [savedImages, setSavedImages] = useState<string[]>(defaultImages || []);
  const [uploadMultiImage, { isLoading }] = useUploadMultipleFileMutation(undefined);

  const imageSizeImMb = files.reduce((acc, curr) => acc + curr.size, 0) / 1024 / 1024;

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (imageSizeImMb >= 10) {
      return toast.error(
        "Image size should be less than 10mb, save your image before uploading new image"
      );
    }

    const files = Array.from(event.dataTransfer.files);

    const types = ["image/jpeg", "image/png", "image/gif", "image/jpeg"];

    const validFiles = files.filter((file) => types.includes(file.type)) || [];

    setFiles((prevImages) => [...prevImages, ...validFiles]);
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeImage = (index: number) => {
    setFiles((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (imageSizeImMb >= 10) {
      return toast.error(
        "Image size should be less than 10mb, save your image before uploading new image"
      );
    }
    const files = Array.from(event.target.files || []);
    setFiles((prevImages) => [...prevImages, ...files]);
    handleSaveImages();
  };

  const handleSaveImages = async () => {
    try {
      const formData = new FormData();
      files.forEach((image) => {
        formData.append("images", image);
      });

      const res = await uploadMultiImage(formData);
      const ulrs = res?.data?.data || [];
      onChange([...savedImages, ...ulrs]);
      setSavedImages([...savedImages, ...ulrs]);

      setFiles([]);
      toast.success("Images uploaded successfully");
    } catch {
      toast.error("Something went wrong while uploading your images");
    }
  };

  const handleRemoveSavedImage = (index: number) => {
    const newImages = [...savedImages].filter((_, i) => i !== index);
    setSavedImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="min-h-[100px] w-full border-[1px] border-border-main p-[16px]">
      <h3 className="text-[20px] font-[600] text-strong">Upload Product Image</h3>

      <div onDrop={handleDrop} onDragOver={handleDragOver}>
        <label
          htmlFor="image-uploader"
          className="center mt-[20px] h-[170px] cursor-pointer flex-col border-[2px] border-dashed border-border-main bg-solid-slab"
        >
          <MdOutlineFileUpload className="text-[50px] text-muted" />
          <span className="text-[18px] font-[600]">Click to upload or drag and drop</span>
          <span className="text-[14px] font-[400] text-muted">PNG/JPG/JPEG/GIF/WEBP</span>
        </label>
      </div>
      <input
        id="image-uploader"
        type="file"
        className="hidden"
        accept=".png, .jpg, .jpeg, .gif, .webp"
        onChange={handleImageChange}
      />

      {defaultImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {defaultImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Uploaded ${index}`}
              className="h-[100px] w-full rounded border object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageUploader;
