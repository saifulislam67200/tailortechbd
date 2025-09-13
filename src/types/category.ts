export interface ICategory {
  _id: string;
  label: string;
  slug: string;
  thumbnail?: string;
  subCount: number;
  parent?: string;
  display?: boolean;
  banner?: string;
  bannerDisplay?: boolean;
  subcategories?: ICategory[];
}

export type TCategoryWithSubcategories = ICategory & {
  subcategories?: TCategoryWithSubcategories[];
};
