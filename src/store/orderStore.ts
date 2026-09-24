import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: "medigo-orders",
    }
  )
);
