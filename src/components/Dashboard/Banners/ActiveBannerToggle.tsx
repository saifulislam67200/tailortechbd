import { useToggleBannerStatusMutation } from "@/redux/features/banner/banner.api";
import React from "react";

const ActiveBannerToggle = ({ id, active }: { id: string; active: boolean }) => {
  const [toggleBannerStatus] = useToggleBannerStatusMutation();
  const handleToggleActive = async (bannerId: string) => {
    try {
      const res = await toggleBannerStatus(bannerId).unwrap();
      console.log("Status toggled:", res);
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  return (
    <button
      onClick={() => handleToggleActive(id)}
      className={`relative inline-flex h-[24px] w-[44px] cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${
        active ? "bg-primary" : "bg-gray-300"
      }`}
      title={`Toggle ${active ? "off" : "on"}`}
    >
      <span
        className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white transition-transform duration-200 ${
          active ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default ActiveBannerToggle;
