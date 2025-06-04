"use client";
import { useEffect } from "react";
const ChatWidget = () => {
  const NEXT_PUBLIC_CHAT_WIDGET_ID = process.env.NEXT_PUBLIC_CHAT_WIDGET_ID;
  const NEXT_PUBLIC_CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID;
  let isInitialized = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tawkWindow = window as any;

  useEffect(() => {
    if (NEXT_PUBLIC_CHAT_ID && NEXT_PUBLIC_CHAT_WIDGET_ID && !isInitialized) {
      if (typeof window !== "undefined") {
        tawkWindow.Tawk_API = tawkWindow.Tawk_API || {};
        tawkWindow.Tawk_API.customStyle = {
          visibility: {
            bubble: {
              xOffset: 20, // Right offset (px)
              yOffset: 90, // Bottom offset (px)
            },
            desktop: {
              xOffset: 20, // Desktop chat widget position
              yOffset: 55,
            },
            mobile: {
              xOffset: 5, // Mobile chat widget position
              yOffset: 55,
            },
          },
        };
      }

      const script = document.createElement("script");
      script.src = `https://embed.tawk.to/${NEXT_PUBLIC_CHAT_ID}/${NEXT_PUBLIC_CHAT_WIDGET_ID}`;
      script.async = true;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
      isInitialized = true;
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [NEXT_PUBLIC_CHAT_ID, NEXT_PUBLIC_CHAT_WIDGET_ID, isInitialized, tawkWindow]);

  useEffect(() => {
    let widgetDiv: HTMLDivElement | null = null;
    let attempts = 0;
    const maxAttempts = 5;

    const findIframe = () => {
      widgetDiv = document.querySelector(".widget-visible") as HTMLDivElement;
      if (!widgetDiv && attempts < maxAttempts) {
        attempts++;
        setTimeout(findIframe, 500); // retry every 500ms
      }
    };

    findIframe();

    return () => {
      if (widgetDiv && widgetDiv.parentNode) {
        widgetDiv.parentNode.removeChild(widgetDiv);
      }
    };
  }, []);

  return null;
};

export default ChatWidget;
