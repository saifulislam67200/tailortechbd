// Simple wrapper so we can type things and avoid "window not defined" issues.
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Track a page view (called on first load + route changes)
export const fbqPageView = () => {
  if (!FB_PIXEL_ID) return;
  window.fbq?.("track", "PageView");
};

// Track a custom/standard event
export const fbqEvent = (name: string, options: Record<string, unknown> = {}) => {
  if (!FB_PIXEL_ID) return;
  window.fbq?.("track", name, options);
};