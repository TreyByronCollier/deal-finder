export type DealDiscount =
  | { type: "percentage"; value: number }
  | { type: "fixed"; value: number; currency: "GBP" };

export interface Deal {
  id: string;
  title: string;
  merchant: string;
  discount: DealDiscount;
  expiry: string; // ISO date
  tags?: string[];
  image?: string;
}
