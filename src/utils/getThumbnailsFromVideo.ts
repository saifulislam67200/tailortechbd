export const extractThumbnailsFromVideoInput = async (
  source: File | string,
  quantity: number
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const video: HTMLVideoElement = document.createElement("video");
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Detect type and set video src
    if (typeof source === "string") {
      video.crossOrigin = "anonymous";
      video.src = source;
    } else {
      video.src = URL.createObjectURL(source);
    }

    video.preload = "auto";

    const thumbnails: string[] = [];

    video.onloadedmetadata = async () => {
      const duration = video.duration;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const captureFrameAt = (time: number): Promise<string> =>
        new Promise((res) => {
          video.currentTime = time;
          video.onseeked = () => {
            if (!ctx) return res("");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.8); // you can reduce quality
            res(dataUrl);
          };
        });

      const timestamps: number[] = Array.from(
        { length: quantity },
        (_, i) => (duration / (quantity + 1)) * (i + 1)
      );

      for (const t of timestamps) {
        const thumbnail = await captureFrameAt(t);
        thumbnails.push(thumbnail);
      }

      resolve(thumbnails);
    };

    video.onerror = () => {
      reject(new Error("Failed to load video. Check if CORS or file format is supported."));
    };
  });
};
