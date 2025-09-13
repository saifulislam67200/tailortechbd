import { ICategory } from "./category";
import { IProduct } from "./product";

export interface IDamageProduct {
  _id: string;
  productId?: string | IProduct;
  productName: string;
  quantity: number;
  productCode: string;
  slug: string;
  causeOfDamage: string;
  image: string;
  price: number;
  color: string;
  size: string;
  category?: string | ICategory;
  subCategory?: ICategory;
  createdAt: Date;
  updatedAt: Date;
}
