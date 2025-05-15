import { ICategory } from "@/types/category";

export const categories: ICategory[] = [
  {
    _id: "electronicsId",
    label: "Electronics",
    slug: "electronics",
    subcategories: [
      {
        _id: "mobilesId",
        label: "Mobile Phones",
        slug: "mobile-phones",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "laptopsId",
        name: "Laptops",
        slug: "laptops",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "tabletsId",
        label: "Tablets",
        slug: "tablets",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "audioId",
        label: "Audio & Headphones",
        slug: "audio-headphones",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    _id: "fashionId",
    label: "Fashion",
    slug: "fashion",
    subcategories: [
      {
        _id: "mensId",
        label: "Men's Clothing",
        slug: "mens-clothing",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "womensId",
        label: "Women's Clothing",
        slug: "womens-clothing",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "shoesId",
        label: "Shoes",
        slug: "shoes",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "accessoriesId",
        label: "Accessories",
        slug: "accessories",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    _id: "homeId",
    label: "Home & Kitchen",
    slug: "home-kitchen",
    subcategories: [
      {
        _id: "furnitureId",
        label: "Furniture",
        slug: "furniture",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "appliancesId",
        label: "Appliances",
        slug: "appliances",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "kitchenwareId",
        label: "Kitchenware",
        slug: "kitchenware",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    _id: "booksId",
    label: "Books",
    slug: "books",
    subcategories: [
      {
        _id: "fictionId",
        label: "Fiction",
        slug: "fiction",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "nonfictionId",
        label: "Non-Fiction",
        slug: "non-fiction",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "childrenId",
        label: "Children's Books",
        slug: "childrens-books",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    _id: "toysId",
    label: "Toys & Games",
    slug: "toys-games",
    subcategories: [
      {
        _id: "toddlerId",
        label: "Toddler Toys",
        slug: "toddler-toys",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "boardgamesId",
        label: "Board Games",
        slug: "board-games",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    _id: "sportsId",
    label: "Sports & Outdoors",
    slug: "sports-outdoors",
    subcategories: [
      {
        _id: "fitnessId",
        label: "Fitness Equipment",
        slug: "fitness-equipment",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "campingId",
        label: "Camping Gear",
        slug: "camping-gear",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    _id: "beautyId",
    label: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    subcategories: [
      {
        _id: "skincareId",
        label: "Skincare",
        slug: "skincare",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
      {
        _id: "makeupId",
        label: "Makeup",
        slug: "makeup",
        thumbnail: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
];
