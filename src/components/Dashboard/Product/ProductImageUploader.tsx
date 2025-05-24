/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import Image from "next/image";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "sonner";

interface IProps {
  onFileUpload?: (file: File[] | null) => void;
  onChange: (file: string[] | null) => void;
  defaultImages?: string[];
  children?: React.ReactNode;
  inputId?: string;
}

const ImageDisplay = ({
  preview,
  onRemove,
  onUploaded,
}: {
  preview: string | File;
  onRemove: () => void;
  onUploaded?: (url: string) => void;
}) => {
  const [uploadSingleFile, { isLoading }] = useUploadSingleFileMutation(undefined);
  const hasUploaded = useRef(false);

  useEffect(() => {
    const handleSaveImages = async () => {
      if (typeof preview === "string" || hasUploaded.current) return;

      hasUploaded.current = true; // prevent duplicate uploads

      try {
        const formData = new FormData();
        formData.append("file", preview);

        const res = await uploadSingleFile(formData);
        const url = res?.data?.data || "";

        onUploaded?.(url);
      } catch {
        toast.error("Something went wrong while uploading your images");
      }
    };

    handleSaveImages();
  }, []);

  return (
    <div className="center relative h-[80px] w-[80px] shrink-0 rounded-[8px] border-[1px] border-border-muted">
      <Image
        width={150}
        height={150}
        src={typeof preview === "string" ? preview : URL.createObjectURL(preview)}
        alt={"saved image"}
        className="h-auto max-h-full w-full rounded-lg object-cover shadow-md"
      />

      {isLoading ? (
        <span className="center absolute top-0 left-0 h-full w-full bg-black/40">
          <CgSpinnerTwo className="animate-spin text-3xl text-primary" />
        </span>
      ) : (
        ""
      )}

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 z-[2] h-[16px] w-[16px] cursor-pointer rounded-full bg-danger text-xs text-white"
        title="Remove image"
      >
        &times;
      </button>
    </div>
  );
};

const ProductImageUploader: React.FC<IProps> = ({
  children,
  onChange,
  defaultImages = [],
  inputId,
}) => {
  const [files, setFiles] = useState<{ file: File; id: string }[]>([]);
  const [savedImages, setSavedImages] = useState<string[]>(defaultImages || []);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);

    const types = ["image/jpeg", "image/png", "image/gif", "image/jpeg"];

    const validFiles = files.filter((file) => types.includes(file.type)) || [];
    const newFilesWithIds = validFiles.map((file) => ({ file, id: crypto.randomUUID() }));

    setFiles((prevImages) => [...prevImages, ...newFilesWithIds]);
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (id: string) => {
    setFiles((prevImages) => prevImages.filter((file, i) => file.id !== id));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles = files.map((file) => ({ file, id: crypto.randomUUID() }));
    setFiles((prevImages) => [...prevImages, ...newFiles]);
  };

  const handleRemoveSavedImage = (index: number) => {
    const newImages = [...savedImages].filter((_, i) => i !== index);
    setSavedImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="min-h-[100px] w-full">
      {children || <h3 className="text-[20px] font-[600] text-strong">Upload Product Image</h3>}

      <div onDrop={handleDrop} onDragOver={handleDragOver}>
        <label
          htmlFor={inputId || "image-uploader"}
          className="center mt-[20px] h-[270px] cursor-pointer flex-col border-[2px] border-dashed border-dashboard/50 bg-dashboard/10"
        >
          <MdOutlineFileUpload className="text-[50px] text-muted" />
          <span className="text-[18px] font-[600] text-dashboard">
            Click to upload or drag and drop
          </span>
          <span className="text-[14px] font-[400] text-muted">PNG/JPG/JPEG/GIF/WEBP</span>
        </label>
      </div>
      <input
        id={inputId || "image-uploader"}
        multiple
        type="file"
        className="hidden"
        accept=".png, .jpg, .jpeg, .gif, .webp"
        onChange={handleImageChange}
      />

      <div className="mt-4 flex flex-wrap items-center justify-start gap-4">
        {files.map((file, index) => (
          <ImageDisplay
            key={index}
            preview={file.file}
            onRemove={() => removeFile(file.id)}
            onUploaded={(url) => {
              removeFile(file.id);
              setSavedImages((prev) => [...prev, url]);
              onChange([...savedImages, url]);
            }}
          />
        ))}
        {savedImages.map((url, index) => (
          <ImageDisplay key={index} preview={url} onRemove={() => handleRemoveSavedImage(index)} />
        ))}
      </div>
    </div>
  );
};

export default ProductImageUploader;
