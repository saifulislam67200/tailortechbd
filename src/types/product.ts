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
  createdAt: string;
  updatedAt?: string;
  chart: string[][];
  sku?: string;
}
