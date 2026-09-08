export type Product = {
  id: string;
  sku: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
  ratingCount: number;
  isActive: boolean;
};

export const products: Product[] = [
  { id: "p1", sku: "LAP-ASUS-TUF-001", title: "ASUS TUF Gaming F15 Laptop", category: "Electronics", brand: "Asus", price: 189_999, stock: 14, rating: 4.4, ratingCount: 128, isActive: true },
  { id: "p2", sku: "AUD-ANK-Q30-014", title: "Anker Soundcore Q30 Headphones", category: "Electronics", brand: "Anker", price: 12_500, stock: 42, rating: 4.6, ratingCount: 302, isActive: true },
  { id: "p3", sku: "WBL-XMI-MB8-002", title: "Xiaomi Mi Band 8", category: "Electronics", brand: "Xiaomi", price: 6_800, stock: 61, rating: 4.3, ratingCount: 540, isActive: true },
  { id: "p4", sku: "SHO-NIK-PEG-039", title: "Nike Air Zoom Pegasus", category: "Sports", brand: "Nike", price: 24_900, stock: 18, rating: 4.7, ratingCount: 88, isActive: true },
  { id: "p5", sku: "FUR-IKE-SD120-7", title: "IKEA Study Desk 120cm", category: "Home & Decor", brand: "IKEA", price: 15_400, stock: 9, rating: 4.1, ratingCount: 47, isActive: true },
  { id: "p6", sku: "PHN-SAM-A54-011", title: "Samsung Galaxy A54", category: "Electronics", brand: "Samsung", price: 89_999, stock: 27, rating: 4.5, ratingCount: 211, isActive: true },
  { id: "p7", sku: "CLO-LEV-501-004", title: "Levi's 501 Original Jeans", category: "Fashion", brand: "Levi's", price: 8_900, stock: 55, rating: 4.2, ratingCount: 96, isActive: true },
  { id: "p8", sku: "BAG-ADI-BP-022", title: "Adidas Essential Backpack", category: "Fashion", brand: "Adidas", price: 5_400, stock: 33, rating: 4.4, ratingCount: 64, isActive: true },
  { id: "p9", sku: "KIT-PRE-AF5L-009", title: "Prestige Air Fryer 5L", category: "Home & Decor", brand: "Prestige", price: 18_500, stock: 0, rating: 4.0, ratingCount: 39, isActive: true },
  { id: "p10", sku: "TOY-LEG-CTY-088", title: "LEGO City Adventure Set", category: "Other", brand: "LEGO", price: 7_200, stock: 21, rating: 4.8, ratingCount: 152, isActive: true },
  { id: "p11", sku: "WAT-CAS-GS-016", title: "Casio G-Shock Watch", category: "Fashion", brand: "Casio", price: 22_000, stock: 12, rating: 4.6, ratingCount: 71, isActive: false },
  { id: "p12", sku: "MON-LG-27UL-031", title: "LG 27\" UltraFine Monitor", category: "Electronics", brand: "LG", price: 78_500, stock: 6, rating: 4.5, ratingCount: 33, isActive: true },
];
