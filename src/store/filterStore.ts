import { create } from "zustand";

interface FilterState {
  searchQuery: string;
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  prescriptionRequired: boolean | null;
  sortBy: "relevance" | "price_asc" | "price_desc" | "discount" | "newest";

  setSearchQuery: (query: string) => void;
  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setMinDiscount: (discount: number) => void;
  setPrescriptionRequired: (required: boolean | null) => void;
  setSortBy: (sort: FilterState["sortBy"]) => void;
  clearFilters: () => void;
}

const initialState = {
  searchQuery: "",
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 10000,
  minDiscount: 0,
  prescriptionRequired: null,
  sortBy: "relevance" as const,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((c) => c !== category)
        : [...state.categories, category],
    })),
  toggleBrand: (brand) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? state.brands.filter((b) => b !== brand)
        : [...state.brands, brand],
    })),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  setMinDiscount: (minDiscount) => set({ minDiscount }),
  setPrescriptionRequired: (prescriptionRequired) => set({ prescriptionRequired }),
  setSortBy: (sortBy) => set({ sortBy }),
  clearFilters: () => set(initialState),
}));
