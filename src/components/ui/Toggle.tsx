"use client";
import { useState } from "react";
const Toggle = ({
  onToggle,
  active,
}: {
  onToggle: (boolean: boolean) => void;
  active?: boolean;
}) => {
  const [isActive, setIsActive] = useState(Boolean(active));
  const handleToggleActive = async () => {
    setIsActive(!isActive);
    onToggle(!isActive);
  };

  return (
    <button
      onClick={() => handleToggleActive()}
      className={`relative inline-flex h-[24px] w-[44px] cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${
        isActive ? "bg-primary" : "bg-primary/10"
      }`}
      style={{
        boxShadow: isActive ? "none" : "0px 1px 2px rgba(0, 0, 0, 0.2) inset",
      }}
      title={`Toggle ${isActive ? "off" : "on"}`}
    >
      <span
        className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white transition-transform duration-200 ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default Toggle;
