"use client";
import { useEffect } from "react";
const ChatWidget = () => {
  const NEXT_PUBLIC_CHAT_WIDGET_ID = process.env.NEXT_PUBLIC_CHAT_WIDGET_ID;
  const NEXT_PUBLIC_CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID;
  let isInitialized = false;
  useEffect(() => {
    if (NEXT_PUBLIC_CHAT_ID && NEXT_PUBLIC_CHAT_WIDGET_ID && !isInitialized) {
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
  }, [NEXT_PUBLIC_CHAT_ID, NEXT_PUBLIC_CHAT_WIDGET_ID, isInitialized]);

  return null;
};

export default ChatWidget;
