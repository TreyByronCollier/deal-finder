import { DealDiscount } from "./deals.types";

export interface Deal {
  id: string;
  merchant: string;
  title: string;
  discount: DealDiscount;
  expiry: string;
  tags?: string[];
  image?: string; // new field
}

export const mockDeals: Deal[] = [
  {
    id: "1",
    merchant: "ASOS",
    title: "20% off all dresses",
    discount: { type: "percentage", value: 20 },
    expiry: "2026-02-01",
    tags: ["Fashion", "Women"],
    image: "https://picsum.photos/400/200", // valid placeholder
  },
  {
    id: "2",
    merchant: "Nike",
    title: "£30 off running shoes",
    discount: { type: "fixed", value: 30, currency: "GBP" },
    expiry: "2026-02-10",
    tags: ["Sports", "Shoes"],
    image: "https://picsum.photos/400/200", // valid placeholder
  },
  {
    id: "3",
    merchant: "Pizza Express",
    title: "Buy 1 Get 1 Free Pizza",
    discount: { type: "fixed", value: 10, currency: "GBP" },
    expiry: "2026-02-05",
    tags: ["Food", "Dining"],
    image: "https://picsum.photos/400/200", // valid placeholder
  },
];
