import React, { ReactNode, useRef, useState } from "react";

interface TooltipProviderProps {
  content: ReactNode;
  children: ReactNode;
  delay?: number;
}

const Tooltip: React.FC<TooltipProviderProps> = ({ content, children, delay = 300 }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className={`absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform rounded bg-primary px-2 py-1 text-xs whitespace-nowrap text-white transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
