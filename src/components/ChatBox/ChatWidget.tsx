"use client";
import { useEffect } from "react";

const ChatWidget = () => {
  const NEXT_PUBLIC_CHAT_WIDGET_ID = process.env.NEXT_PUBLIC_CHAT_WIDGET_ID;
  const NEXT_PUBLIC_CHAT_ID = process.env.NEXT_PUBLIC_CHAT_ID;

  useEffect(() => {
    if (!NEXT_PUBLIC_CHAT_ID || !NEXT_PUBLIC_CHAT_WIDGET_ID) return;

    const script = document.createElement("script");
    script.src = `https://embed.tawk.to/${NEXT_PUBLIC_CHAT_ID}/${NEXT_PUBLIC_CHAT_WIDGET_ID}`;
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    // Function to adjust the Tawk.to iframe
    const repositionTawk = () => {
      let attempts = 0;
      const maxAttempts = 5;

      const tryReposition = () => {
        const iframe = document.querySelector('iframe[title="chat widget"]') as HTMLIFrameElement;
        if (iframe) {
          iframe.style.bottom = "100px";
          iframe.style.right = "20px";
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryReposition, 500);
        }
      };

      tryReposition();
    };

    // Only reposition on small screens
    if (window.innerWidth <= 768) {
      repositionTawk();
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [NEXT_PUBLIC_CHAT_ID, NEXT_PUBLIC_CHAT_WIDGET_ID]);

  return null;
};

export default ChatWidget;
