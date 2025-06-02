"use client";
import { useState } from "react";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import ChatInput from "./ChatInput";
const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed right-[12px] bottom-[50px] z-50 md:right-[28px] md:bottom-[45px]">
      {/* Chat Box */}
      {isOpen ? (
        <div className="mb-4 w-[300px] rounded-lg bg-white shadow-xl transition-all duration-300 md:w-[350px]">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-lg bg-primary p-4 text-white">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-white">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Support"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Support Center</h3>
              <p className="text-xs text-white/80">Online</p>
            </div>
            <button
              onClick={toggleChat}
              className="rounded-full p-1 text-white transition hover:bg-secondary/30"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-[300px] overflow-auto bg-primary/5 p-4">
            <div className="mb-4 max-w-[80%] rounded-lg bg-white p-3 shadow">
              <p className="text-sm">Hello! How can we help you today?</p>
              <p className="mt-1 text-right text-xs text-muted">10:30 AM</p>
            </div>
          </div>

          {/* Chat Input */}
          <ChatInput />
        </div>
      ) : (
        <button
          onClick={toggleChat}
          rel="noopener noreferrer"
          className="rounded-full bg-[#25d366] p-[8px] text-white transition duration-300 hover:bg-green-600"
        >
          <FaWhatsapp className="text-[35px]" />
        </button>
      )}

      {/* WhatsApp Button */}
    </div>
  );
};

export default ChatBox;
