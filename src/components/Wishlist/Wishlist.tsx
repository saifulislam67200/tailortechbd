"use client";

import React from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import Favorite from "./Favorite";

const Wishlist = () => {
  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />

      <Favorite />
    </div>
  );
};

export default Wishlist;
