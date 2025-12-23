"use client";

import Image from "next/image";
import { useState } from "react";
import { FiX } from "react-icons/fi";

interface ChatWidgetPopupProps {
  pageUsername?: string;
  companyName?: string;
  companyLogo?: string;
  responseTime?: string;
  greetingMessage?: string;
  showNotification?: boolean;
}

const ChatWidgetPopup = ({
  pageUsername,
  companyName = "Tailortech Support",
  companyLogo = "/images/logos/logo-.webp",
  responseTime = "Typically replies within an hour",
  greetingMessage = "Hi there 👋\nHow can I help you?",
  showNotification = true,
}: ChatWidgetPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get page username from environment variable or prop
  const messengerUsername = pageUsername || process.env.NEXT_PUBLIC_MESSENGER_PAGE_USERNAME || "";

  if (!messengerUsername) {
    console.warn(
      "Messenger page username missing. Set NEXT_PUBLIC_MESSENGER_PAGE_USERNAME or pass pageUsername prop."
    );
    return null;
  }

  // Build m.me link
  const messengerUrl = `https://m.me/${messengerUsername}`;

  const handleChatClick = () => {
    window.open(messengerUrl, "_blank", "noopener,noreferrer");
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Get current time for timestamp
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className="fixed right-3 bottom-4 z-50 sm:right-5 sm:bottom-14 lg:right-6 lg:bottom-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}
    >
      {/* Chat Popup Widget */}
      {isOpen && (
        <div className="absolute right-0 bottom-[calc(100%+0.75rem)] w-[calc(100vw-1.5rem)] max-w-sm transform animate-[slideUp_0.3s_ease-out] overflow-hidden rounded-lg border border-border-main bg-white shadow-2xl transition-all duration-300 ease-out sm:max-w-md md:max-w-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border-main bg-primary/5 p-3 sm:p-4">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              {/* Company Logo/Avatar with Online Status */}
              <div className="relative flex-shrink-0">
                {companyLogo ? (
                  <Image
                    src={companyLogo}
                    alt={companyName}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-white sm:h-10 sm:w-10"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-base font-bold text-white ring-2 ring-white sm:h-10 sm:w-10 sm:text-lg">
                    {companyName.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Online Status Indicator */}
                <div className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-success sm:h-3 sm:w-3"></div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-xs font-semibold text-strong sm:text-sm">
                  {companyName}
                </h3>
                <p className="truncate text-[10px] text-muted sm:text-xs">{responseTime}</p>
              </div>
            </div>
            {/* Close Button */}
            <button
              onClick={handleToggle}
              className="flex-shrink-0 touch-manipulation p-1.5 text-muted transition-colors hover:text-strong active:scale-95 sm:p-1"
              aria-label="Close chat"
            >
              <span className="flex h-5 w-5 items-center justify-center">
                <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
            </button>
          </div>

          {/* Timestamp */}
          <div className="py-1.5 text-center sm:py-2">
            <span className="text-[10px] text-muted sm:text-xs">{currentTime}</span>
          </div>

          {/* Chat Message */}
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="max-w-[85%] rounded-lg bg-tertiary p-2.5 sm:p-3">
              <p className="text-xs break-words whitespace-pre-line text-strong sm:text-sm">
                {greetingMessage}
              </p>
            </div>
          </div>

          {/* Chat on Messenger Button */}
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            <button
              onClick={handleChatClick}
              className="flex w-full touch-manipulation items-center justify-center gap-2 rounded-lg bg-[#0084FF] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#0066CC] hover:shadow-lg active:scale-[0.98] sm:py-3 sm:text-base"
            >
              {/* Messenger Logo */}
              <Image
                src="/images/Messenger.svg"
                alt="Messenger"
                width={20}
                height={20}
                className="flex-shrink-0"
              />
              <span className="whitespace-nowrap">Chat on Messenger</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={handleToggle}
        className="relative flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border-2 border-border-main bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:border-primary/30 hover:shadow-xl active:scale-95 sm:h-14 sm:w-14"
        aria-label="Open chat"
        title="Chat with us"
      >
        {/* Messenger Logo */}
        <Image
          src="/images/Messenger.svg"
          alt="Messenger"
          width={24}
          height={24}
          className="sm:h-[26px] sm:w-[26px]"
        />
        {/* Notification Dot with Water Drop Ripple Animation - Stops when popup is open */}
        {showNotification && (
          <div className="absolute top-0 right-0 flex items-center justify-center">
            {/* Ripple Layer 1 - Outer */}
            <span
              className="absolute h-3 w-3 rounded-full border-2 border-[#0084FF]/40 sm:h-4 sm:w-4"
              style={{
                animation: !isOpen ? "ripple 2s ease-out infinite" : "none",
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }}
            ></span>
            {/* Ripple Layer 2 - Middle */}
            <span
              className="absolute h-3 w-3 rounded-full border-2 border-[#0084FF]/50 sm:h-4 sm:w-4"
              style={{
                animation: !isOpen ? "ripple-delayed 2s ease-out infinite 0.3s" : "none",
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }}
            ></span>
            {/* Ripple Layer 3 - Inner */}
            <span
              className="absolute h-3 w-3 rounded-full border-2 border-[#0084FF]/60 sm:h-4 sm:w-4"
              style={{
                animation: !isOpen ? "ripple 2s ease-out infinite 0.6s" : "none",
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }}
            ></span>
            {/* Center Dot */}
            <span className="relative z-10 h-3 w-3 rounded-full border-2 border-white bg-[#0084FF] shadow-lg sm:h-4 sm:w-4"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatWidgetPopup;
