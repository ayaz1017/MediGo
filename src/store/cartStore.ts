import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Medicine } from "@/types/medicine";

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (medicine: Medicine, quantity?: number) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      addItem: (medicine, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.medicine.id === medicine.id);
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.medicine.id === medicine.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { medicine, quantity }] });
        }
      },
      removeItem: (medicineId) => {
        set({
          items: get().items.filter((item) => item.medicine.id !== medicineId),
        });
      },
      updateQuantity: (medicineId, quantity) => {
        set({
          items: get().items.map((item) =>
            item.medicine.id === medicineId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      cartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.medicine.price * item.quantity,
          0
        );
      },
      cartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "medigo-cart",
    }
  )
);
