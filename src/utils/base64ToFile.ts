export function base64ToFile(base64: string, filename: string, mimeType?: string): File {
  // If it's a data URL like "data:image/png;base64,...", split it
  const arr = base64.split(",");
  let bstr: string;
  let mime: string;

  if (arr.length > 1) {
    // Proper data URL
    mime = arr[0].match(/:(.*?);/)?.[1] || mimeType || "application/octet-stream";
    bstr = atob(arr[1]);
  } else {
    // Raw base64 string
    mime = mimeType || "application/octet-stream";
    bstr = atob(base64);
  }

  // Convert binary string → Uint8Array
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
}
