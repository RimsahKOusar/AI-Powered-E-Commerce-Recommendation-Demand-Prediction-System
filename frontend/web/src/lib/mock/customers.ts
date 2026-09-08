export type Segment = "new" | "window_shopper" | "high_intent" | "loyal" | "at_risk";

export type Customer = {
  id: string;
  name: string;
  email: string;
  segment: Segment;
  orders: number;
  totalSpent: number;
  joined: string;
};

export const customers: Customer[] = [
  { id: "u1", name: "Ayesha Raza", email: "ayesha.raza@example.com", segment: "loyal", orders: 18, totalSpent: 412_800, joined: "2025-02-14" },
  { id: "u2", name: "Bilal Ahmed", email: "bilal.ahmed@example.com", segment: "new", orders: 1, totalSpent: 8_900, joined: "2026-09-01" },
  { id: "u3", name: "Sana Tariq", email: "sana.tariq@example.com", segment: "high_intent", orders: 6, totalSpent: 156_400, joined: "2025-11-20" },
  { id: "u4", name: "Usman Khalid", email: "usman.khalid@example.com", segment: "window_shopper", orders: 2, totalSpent: 22_100, joined: "2025-08-03" },
  { id: "u5", name: "Fatima Noor", email: "fatima.noor@example.com", segment: "at_risk", orders: 4, totalSpent: 34_600, joined: "2025-01-27" },
  { id: "u6", name: "Hamza Sheikh", email: "hamza.sheikh@example.com", segment: "loyal", orders: 24, totalSpent: 588_200, joined: "2024-11-09" },
  { id: "u7", name: "Mahnoor Ali", email: "mahnoor.ali@example.com", segment: "high_intent", orders: 5, totalSpent: 98_750, joined: "2025-06-18" },
];

export const SEGMENT_LABEL: Record<Segment, string> = {
  new: "New",
  window_shopper: "Window shopper",
  high_intent: "High intent",
  loyal: "Loyal",
  at_risk: "At risk",
};

export const SEGMENT_TONE: Record<Segment, "primary" | "success" | "warning" | "info" | "danger"> = {
  new: "warning",
  window_shopper: "info",
  high_intent: "primary",
  loyal: "success",
  at_risk: "danger",
};
