export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded";

export type Order = {
  id: string;
  customer: string;
  email: string;
  items: number;
  amount: number;
  status: OrderStatus;
  paymentMethod: string;
  placedAt: string;
};

export const orders: Order[] = [
  { id: "ORD-8841", customer: "Ayesha Raza", email: "ayesha.raza@example.com", items: 3, amount: 42_500, status: "paid", paymentMethod: "COD", placedAt: "2026-09-08 09:12" },
  { id: "ORD-8840", customer: "Bilal Ahmed", email: "bilal.ahmed@example.com", items: 1, amount: 8_900, status: "pending", paymentMethod: "COD", placedAt: "2026-09-08 08:47" },
  { id: "ORD-8839", customer: "Sana Tariq", email: "sana.tariq@example.com", items: 2, amount: 61_200, status: "shipped", paymentMethod: "Card", placedAt: "2026-09-08 07:58" },
  { id: "ORD-8838", customer: "Usman Khalid", email: "usman.khalid@example.com", items: 1, amount: 15_750, status: "paid", paymentMethod: "COD", placedAt: "2026-09-08 06:20" },
  { id: "ORD-8837", customer: "Fatima Noor", email: "fatima.noor@example.com", items: 1, amount: 3_400, status: "cancelled", paymentMethod: "Card", placedAt: "2026-09-08 05:41" },
  { id: "ORD-8836", customer: "Hamza Sheikh", email: "hamza.sheikh@example.com", items: 4, amount: 96_100, status: "delivered", paymentMethod: "Card", placedAt: "2026-09-07 22:03" },
  { id: "ORD-8835", customer: "Mahnoor Ali", email: "mahnoor.ali@example.com", items: 2, amount: 27_300, status: "delivered", paymentMethod: "COD", placedAt: "2026-09-07 20:15" },
  { id: "ORD-8834", customer: "Zainab Malik", email: "zainab.malik@example.com", items: 1, amount: 6_800, status: "refunded", paymentMethod: "Card", placedAt: "2026-09-07 18:32" },
];

export const STATUS_TONE: Record<OrderStatus, "success" | "warning" | "info" | "danger" | "neutral"> = {
  pending: "warning",
  paid: "success",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
  refunded: "neutral",
};
