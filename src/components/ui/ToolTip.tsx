import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProviderProps {
  content: ReactNode;
  children: ReactNode;
  delay?: number;
}

const Tooltip: React.FC<TooltipProviderProps> = ({ content, children, delay = 300 }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const top = triggerRect.top + window.scrollY - tooltipRect.height - 8; // 8px gap
      const left = triggerRect.left + window.scrollX + triggerRect.width / 2;

      setPosition({ top, left });
    }
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  // Recalculate after tooltip becomes visible
  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }
  }, [visible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex"
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            ref={tooltipRef}
            className="pointer-events-none fixed z-50 max-w-[200px] -translate-x-1/2 transform rounded bg-white p-1 text-center text-[12px] text-muted shadow-md"
            style={{
              top: position.top,
              left: position.left,
              whiteSpace: "normal",
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
