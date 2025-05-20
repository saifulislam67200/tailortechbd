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

export interface IProductSpecification {
  label: string;
  value: string;
}

export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  brand: string;
  colors: IColor[];
  categories: string | ICategory;
  avgRating: number;
  // stock: number;
  discount: number;
  specifications: IProductSpecification[];
}
