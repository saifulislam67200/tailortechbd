"use client";
import { createPortal } from "react-dom";

interface Props {
  show: boolean;
  imageUrl: string;
  width: number;
  height: number;
  position: { x: number; y: number };
  targetRect: DOMRect | null;
  zoom: number;
  className?: string;
}

const MagnifierPortal = ({
  show,
  imageUrl,
  width,
  height,
  position,
  targetRect,
  zoom,
  className,
}: Props) => {
  if (!show || !targetRect) return null;

  const left = targetRect.right + 20;
  const top = targetRect.top;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `${position.x}px ${position.y}px`,
        backgroundSize: `${width * zoom}px ${height * zoom}px`,
        backgroundRepeat: "no-repeat",
        border: "2px solid #ccc",
        backgroundColor: "#fff",
        zIndex: 9999,
        pointerEvents: "none",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
      className={className}
    />,
    document.body
  );
};

export default MagnifierPortal;
