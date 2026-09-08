export type Category = {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
  productCount: number;
  isActive: boolean;
};

export const categories: Category[] = [
  { id: "c1", name: "Electronics", slug: "electronics", parent: null, productCount: 412, isActive: true },
  { id: "c2", name: "Computers & Laptops", slug: "computers-laptops", parent: "Electronics", productCount: 118, isActive: true },
  { id: "c3", name: "Audio", slug: "audio", parent: "Electronics", productCount: 76, isActive: true },
  { id: "c4", name: "Mobile Phones", slug: "mobile-phones", parent: "Electronics", productCount: 94, isActive: true },
  { id: "c5", name: "Fashion", slug: "fashion", parent: null, productCount: 587, isActive: true },
  { id: "c6", name: "Men's Clothing", slug: "mens-clothing", parent: "Fashion", productCount: 214, isActive: true },
  { id: "c7", name: "Watches", slug: "watches", parent: "Fashion", productCount: 62, isActive: true },
  { id: "c8", name: "Home & Decor", slug: "home-decor", parent: null, productCount: 305, isActive: true },
  { id: "c9", name: "Kitchen Appliances", slug: "kitchen-appliances", parent: "Home & Decor", productCount: 88, isActive: true },
  { id: "c10", name: "Sports", slug: "sports", parent: null, productCount: 176, isActive: true },
  { id: "c11", name: "Toys & Games", slug: "toys-games", parent: null, productCount: 92, isActive: false },
];
