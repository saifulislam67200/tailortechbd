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

    let observer: MutationObserver | null = null;

    const applyStyle = () => {
      const iframe = document.querySelector('iframe[title="chat widget"]') as HTMLIFrameElement;
      const winddowWidth = window.innerWidth;
      if (iframe && winddowWidth <= 768) {
        iframe.style.bottom = "63px";
      }
    };

    const initObserver = () => {
      const container = document.body;
      observer = new MutationObserver(() => {
        applyStyle(); // re-apply styles on any DOM change
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
      });
    };

    // Wait until iframe appears then observe
    const waitForIframe = (retries = 0) => {
      if (retries > 5) return;
      const iframe = document.querySelector('iframe[title="chat widget"]');
      if (iframe) {
        applyStyle();
        initObserver();
      } else {
        setTimeout(() => waitForIframe(retries + 1), 500);
      }
    };

    if (window.innerWidth <= 768) {
      waitForIframe();
    }

    return () => {
      document.body.removeChild(script);
      observer?.disconnect();
    };
  }, [NEXT_PUBLIC_CHAT_ID, NEXT_PUBLIC_CHAT_WIDGET_ID]);

  return null;
};

export default ChatWidget;
