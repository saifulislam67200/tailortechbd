import { ICategory } from "./category";

export interface ISize {
  size: string;
  stock: number;
  _id?: string;
}

export interface IColor {
  color: string;
  sizes: ISize[];
  images?: string[];
  _id?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  quickOverview?: string;
  buyingPrice?: number;
  price: number;
  brand: string;
  colors: IColor[];
  category: string | ICategory;
  avgRating: number;
  // stock: number;
  discount: number;
  tag?: string;
  images: string[];
  video?: string;
  videoThumbnail?: string;
  createdAt: string;
  updatedAt?: string;
  chart: string[][];
  sku?: string;
  fabric?: string;
}

export interface IProductStock {
  _id: string;
  productName: string;
  slug: string;
  color: string;
  size: string;
  stock: number;
  status: string;
  sku: string;
  price: number;
  value: number;
  category: string | ICategory;
  subCategory: string;
  parentCategory: string | null;
  createdAt: string;
  updatedAt: string;
  openingStock: number;
  salesQty: number;
  damagedQty: number;
  offerPrice: number | null;
  totalPrice: number;
  discount: number;
}
