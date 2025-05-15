export interface ISubcategory {
  _id: string;
  label?: string;
  name?: string;
  slug?: string;
  thumbnail?: string;
}

export interface ICategory {
  _id: string;
  label: string;
  slug: string;
  subcategories: ISubcategory[];
}
