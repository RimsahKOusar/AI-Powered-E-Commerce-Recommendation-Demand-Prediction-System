export type UserRole = "customer" | "admin";

export type User = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
};

export type TokenPair = {
  user: User;
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type AccessPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type ApiErrorBody = {
  error: { code: string; message: string; details: Record<string, unknown> };
  request_id: string;
};

export type Category = {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  is_active: boolean;
  product_count: number;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  title: string;
  description: string;
  category_id: string;
  category_name: string | null;
  brand: string | null;
  price: number;
  discount_price: number | null;
  currency: string;
  image_url: string | null;
  stock: number;
  rating_avg: number;
  rating_count: number;
  is_active: boolean;
};

export type Paginated<T> = {
  data: T[];
  meta: { pagination: { page: number; page_size: number; total: number; total_pages: number } };
};
