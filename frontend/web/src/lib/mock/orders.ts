export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled" | "refunded";

export type OrderLineItem = { title: string; sku: string; qty: number; price: number };

export type Order = {
  id: string;
  customer: string;
  email: string;
  items: number;
  amount: number;
  status: OrderStatus;
  paymentMethod: string;
  placedAt: string;
  shippingAddress: string;
  lineItems: OrderLineItem[];
};

const CUSTOMERS = [
  "Ayesha Raza", "Bilal Ahmed", "Sana Tariq", "Usman Khalid", "Fatima Noor",
  "Hamza Sheikh", "Mahnoor Ali", "Zainab Malik", "Ahmed Raza", "Iqra Siddiqui",
  "Omar Farooq", "Rabia Yousuf",
];

const STATUSES: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "cancelled", "refunded"];
const PAYMENTS = ["COD", "Card"];

const CATALOG: OrderLineItem[] = [
  { title: "ASUS TUF Gaming F15 Laptop", sku: "LAP-ASUS-TUF-001", qty: 1, price: 189_999 },
  { title: "Anker Soundcore Q30 Headphones", sku: "AUD-ANK-Q30-014", qty: 1, price: 12_500 },
  { title: "Xiaomi Mi Band 8", sku: "WBL-XMI-MB8-002", qty: 1, price: 6_800 },
  { title: "Nike Air Zoom Pegasus", sku: "SHO-NIK-PEG-039", qty: 1, price: 24_900 },
  { title: "Samsung Galaxy A54", sku: "PHN-SAM-A54-011", qty: 1, price: 89_999 },
  { title: "Levi's 501 Original Jeans", sku: "CLO-LEV-501-004", qty: 1, price: 8_900 },
];

const CITIES = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Multan", "Peshawar"];

function lineItemsFor(seed: number): OrderLineItem[] {
  const count = (seed % 3) + 1;
  const items: OrderLineItem[] = [];
  for (let i = 0; i < count; i++) {
    const base = CATALOG[(seed + i) % CATALOG.length];
    items.push({ ...base, qty: ((seed + i) % 3) + 1 });
  }
  return items;
}

export const orders: Order[] = Array.from({ length: 32 }, (_, i) => {
  const seed = 8841 - i;
  const customer = CUSTOMERS[i % CUSTOMERS.length];
  const lineItems = lineItemsFor(seed);
  const amount = lineItems.reduce((sum, li) => sum + li.price * li.qty, 0);
  const daysAgo = Math.floor(i / 3);
  const hour = 22 - (i % 12);

  return {
    id: `ORD-${seed}`,
    customer,
    email: `${customer.toLowerCase().replace(/[^a-z]+/g, ".")}example.com`.replace(".example.com", "@example.com"),
    items: lineItems.reduce((n, li) => n + li.qty, 0),
    amount,
    status: STATUSES[i % STATUSES.length],
    paymentMethod: PAYMENTS[i % PAYMENTS.length],
    placedAt: `2026-09-${String(8 - daysAgo).padStart(2, "0")} ${String(Math.max(hour, 0)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
    shippingAddress: `House ${12 + i}, Block ${String.fromCharCode(65 + (i % 6))}, ${CITIES[i % CITIES.length]}, Pakistan`,
    lineItems,
  };
});

export const STATUS_TONE: Record<OrderStatus, "success" | "warning" | "info" | "danger" | "neutral"> = {
  pending: "warning",
  paid: "success",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
  refunded: "neutral",
};
