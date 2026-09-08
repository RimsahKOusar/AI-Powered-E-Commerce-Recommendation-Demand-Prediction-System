export type UserRole = "customer" | "admin";

export type User = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
  cover_image_url: string | null;
  role: UserRole;
  is_email_verified: boolean;
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

export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded";

export type OrderItem = {
  id: string;
  product_id: string;
  title_snapshot: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export type Order = {
  id: string;
  user_id: string;
  customer_name: string | null;
  customer_email: string | null;
  status: OrderStatus;
  subtotal: number;
  shipping_total: number;
  grand_total: number;
  currency: string;
  payment_method: string;
  shipping_address: string;
  placed_at: string;
  items: OrderItem[];
};

export type CartItem = {
  product_id: string;
  title: string;
  slug: string;
  image_url: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
  stock: number;
  is_active: boolean;
};

export type Cart = {
  id: string;
  items: CartItem[];
  item_count: number;
  subtotal: number;
  currency: string;
};

export type CustomerSegment = "new" | "window_shopper" | "high_intent" | "loyal";

export type Customer = {
  id: string;
  full_name: string;
  email: string;
  joined_at: string;
  orders_count: number;
  total_spent: number;
  segment: CustomerSegment;
};
