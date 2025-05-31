"use client";
import SidebarElement from "@/components/Shared/dashboard/SidebarElement";
import { GoQuestion } from "react-icons/go";
import { MdInventory2, MdOutlineContactSupport } from "react-icons/md";
import { PiFlagBannerFoldBold, PiShoppingCartSimpleBold } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";
export interface IDashboardNavLinks {
  label: string;
  icon?: React.ElementType;
  path?: string;
  children?: IDashboardNavLinks[];
  element?: React.ElementType;
}

export const admin: IDashboardNavLinks[] = [
  {
    icon: VscGraphLine,
    label: "Statistics",
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
    element: SidebarElement.PendingOrderCount,
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
    element: SidebarElement.PendingQuestionCount,
  },
  {
    icon: PiFlagBannerFoldBold,
    label: "Manage Banners",
    path: "/dashboard/banners",
  },
  {
    icon: RiAdminLine,
    label: "User Controle",
    children: [
      {
        path: "/dashboard/manage-admins",
        label: "All Admins",
      },
      {
        path: "/dashboard/manage-customers",
        label: "All Customer",
      },
    ],
  },
  {
    icon: MdOutlineContactSupport,
    label: "Support Contact",
    path: "/dashboard/contact-support",
  },
];

const dashboardNavLinks = {
  admin,
};

export default dashboardNavLinks;
