export type Risk = "HIGH" | "MEDIUM" | "LOW";

export type InventoryRow = {
  product: string;
  sku: string;
  stock: number;
  predicted30d: number;
  coverage: number;
  risk: Risk;
  reorderQty: number;
};

export const inventory: InventoryRow[] = [
  { product: "ASUS TUF F15 Gaming Laptop", sku: "LAP-ASUS-TUF-001", stock: 14, predicted30d: 33, coverage: 0.42, risk: "HIGH", reorderQty: 38 },
  { product: "Anker Soundcore Q30", sku: "AUD-ANK-Q30-014", stock: 42, predicted30d: 72, coverage: 0.58, risk: "HIGH", reorderQty: 60 },
  { product: "Xiaomi Mi Band 8", sku: "WBL-XMI-MB8-002", stock: 61, predicted30d: 75, coverage: 0.81, risk: "MEDIUM", reorderQty: 24 },
  { product: "Nike Air Zoom Pegasus", sku: "SHO-NIK-PEG-039", stock: 18, predicted30d: 19, coverage: 0.93, risk: "MEDIUM", reorderQty: 15 },
  { product: "Samsung Galaxy A54", sku: "PHN-SAM-A54-011", stock: 27, predicted30d: 21, coverage: 1.29, risk: "LOW", reorderQty: 0 },
  { product: "Prestige Air Fryer 5L", sku: "KIT-PRE-AF5L-009", stock: 0, predicted30d: 14, coverage: 0, risk: "HIGH", reorderQty: 20 },
  { product: "LEGO City Adventure Set", sku: "TOY-LEG-CTY-088", stock: 21, predicted30d: 16, coverage: 1.31, risk: "LOW", reorderQty: 0 },
  { product: "IKEA Study Desk 120cm", sku: "FUR-IKE-SD120-7", stock: 9, predicted30d: 12, coverage: 0.75, risk: "MEDIUM", reorderQty: 8 },
  { product: "LG 27\" UltraFine Monitor", sku: "MON-LG-27UL-031", stock: 6, predicted30d: 5, coverage: 1.2, risk: "LOW", reorderQty: 0 },
];
