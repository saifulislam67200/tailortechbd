"use client";
import { MdInventory2 } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
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
    path: "/dashboard/admin",
  },
  {
    label: "Product Inventory",
    icon: MdInventory2,
    children: [
      {
        label: "All Products",
        path: "/dashboard/admin/products",
      },
      {
        label: "Create New Product",
        path: "/dashboard/admin/product-create",
      },
    ],
  },
];

const dashboardNavLinks = {
  admin,
};

export default dashboardNavLinks;
