"use client";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "sonner";

interface IProps {
  onFileUpload?: (file: File | null) => void;
  onChange: (file: string | null) => void;
  defaultVideo?: string;
  children?: React.ReactNode;
  inputId?: string;
  labelStyle?: string;
}

const VideoDisplay = ({
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
    const handleSaveVideo = async () => {
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

    handleSaveVideo();
  }, []);

  return (
    <div className="center relative h-[200px] w-[200px] shrink-0 rounded-[8px] border-[1px] border-border-muted">
      <video
        width={250}
        height={250}
        controls={Boolean(preview)}
        src={typeof preview === "string" ? preview : URL.createObjectURL(preview)}
        className="h-auto max-h-full w-full rounded-lg object-cover shadow-md"
      />

      {isLoading ? (
        <span className="center absolute top-0 left-0 h-full w-full bg-black/40">
          <CgSpinnerTwo className="animate-spin text-3xl text-white" />
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

const UploadProductVideo: React.FC<IProps> = ({
  children,
  onChange,
  defaultVideo = "",
  inputId,
  labelStyle,
}) => {
  const [file, setFile] = useState<{ file: File; id: string }>();
  const [savedVideo, setSavedVideo] = useState<string>(defaultVideo || "");
  const checkVideoDuration = (file: File, maxSeconds = 60) =>
    new Promise<boolean>((resolve) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        const ok = Number.isFinite(video.duration) && video.duration <= maxSeconds + 1; // tiny buffer
        resolve(ok);
      };
      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(false);
      };
      video.src = url;
    });
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);

    const types = ["video/mp4", "video/webm"];

    const validFiles = files.filter((file) => types.includes(file.type)) || [];

    if (validFiles.length) {
      const newFileWithIds = { file: validFiles[0], id: crypto.randomUUID() };

      setFile(newFileWithIds);
    }
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length) {
      const isValidDuration = await checkVideoDuration(files[0]);
      if (!isValidDuration) {
        toast.error("Video duration must be within 60 seconds");
        return;
      }
      const newFile = { file: files[0], id: crypto.randomUUID() };
      setFile(newFile);
    }
    event.target.value = "";
  };

  const handleRemoveSavedImage = () => {
    setSavedVideo("");
    onChange("");
  };

  return (
    <div className="min-h-[100px] w-full">
      {children || (
        <h3 className="text-[14px] font-[600] text-strong md:text-[16px] lg:text-[20px]">
          Upload Product Video
        </h3>
      )}

      <div onDrop={handleDrop} onDragOver={handleDragOver}>
        <label
          htmlFor={inputId || "video-uploader"}
          className={`center mt-[20px] h-[150px] cursor-pointer flex-col border-[2px] border-dashed border-dashboard/50 bg-dashboard/10 md:h-[200px] lg:h-[270px] ${labelStyle}`}
        >
          <MdOutlineFileUpload className="size-7 text-[50px] text-muted md:size-10" />
          <span className="text-[12px] text-dashboard md:text-[18px] md:font-[600]">
            Click to upload or drag and drop
          </span>
          <span className="text-[12px] font-[400] text-muted sm:text-[14px]">Mp4/Webp</span>
        </label>
      </div>
      <input
        id={inputId || "video-uploader"}
        multiple
        type="file"
        className="hidden"
        accept="video/mp4, video/webm"
        onChange={handleImageChange}
      />

      <div className="mt-4 flex flex-wrap items-center justify-start gap-4">
        {file ? (
          <VideoDisplay
            preview={file.file}
            onRemove={() => removeFile()}
            onUploaded={(url) => {
              removeFile();
              setSavedVideo(url);
              onChange(url);
            }}
          />
        ) : (
          ""
        )}
        {savedVideo ? (
          <VideoDisplay preview={savedVideo} onRemove={() => handleRemoveSavedImage()} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UploadProductVideo;
