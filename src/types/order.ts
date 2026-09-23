import { Medicine } from "./medicine";
import { Address } from "./user";

export interface OrderItem {
  id: string;
  medicine: Medicine;
  quantity: number;
  price: number;
}

export type OrderStatus = "Placed" | "Confirmed" | "Dispatched" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMode: "Online" | "COD";
  shippingAddress: Address;
  prescriptionUrls?: string[]; // If prescription required
  placedAt: string; // ISO date string
  estimatedDeliveryAt: string; // ISO date string
}
