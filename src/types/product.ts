import { ICategory } from "./category";

export interface ISize {
  size: string;
  stock: number;
}

export interface IColor {
  color: string;
  sizes: ISize[];
  images?: string[];
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  brand: string;
  colors: IColor[];
  category: string | ICategory;
  avgRating: number;
  // stock: number;
  discount: number;
  tag?: string;
  images: string[];
  chart: string[][];
}
