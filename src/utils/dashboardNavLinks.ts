"use client";
import { FaBoxes } from "react-icons/fa";
import { MdInventory2, MdSpaceDashboard } from "react-icons/md";
export interface IDashboardNavLinks {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: IDashboardNavLinks[];
}

export const admin: IDashboardNavLinks[] = [
  {
    icon: MdSpaceDashboard,
    label: "Dashboard",
    path: "/dashboard/admin",
  },
  {
    label: "Product Inventory",
    icon: MdInventory2,
    children: [
      {
        label: "All Products",
        path: "/dashboard/admin/products",
        icon: FaBoxes,
      },
      {
        label: "Create New Product",
        path: "/dashboard/admin/product-create",
        icon: FaBoxes,
      },
    ],
  },
];

const dashboardNavLinks = {
  admin,
};

export default dashboardNavLinks;
