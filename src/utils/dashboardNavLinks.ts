"use client";
import { MdInventory2 } from "react-icons/md";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";
import { GoQuestion } from "react-icons/go";
import { PiFlagBannerFoldBold } from "react-icons/pi";
export interface IDashboardNavLinks {
  label: string;
  icon?: React.ElementType;
  path?: string;
  children?: IDashboardNavLinks[];
}

export const admin: IDashboardNavLinks[] = [
  {
    icon: VscGraphLine,
    label: "Dashboard Statistics",
    path: "/dashboard",
  },
  {
    label: "Product Inventory",
    icon: MdInventory2,
    children: [
      {
        label: "All Products",
        path: "/dashboard/products",
      },
      {
        label: "Create New Product",
        path: "/dashboard/product-create",
      },
    ],
  },
  {
    icon: PiShoppingCartSimpleBold,
    label: "All Orders",
    path: "/dashboard/all-orders",
  },
  {
    icon: TbCategory,
    label: "Manage Categories",
    path: "/dashboard/manage-category",
  },
  {
    icon: GoQuestion,
    label: "QNA",
    path: "/dashboard/qna",
  },
  {
    icon: PiFlagBannerFoldBold,
    label: "Manage Banners",
    path: "/dashboard/banners",
  },
];

const dashboardNavLinks = {
  admin,
};

export default dashboardNavLinks;
