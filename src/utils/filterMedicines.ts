import { allMedicines } from "@/data/medicines";
import { Medicine } from "@/types/medicine";

interface FilterOptions {
  query?: string;
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  maxDiscount?: number;
  inStockOnly?: boolean;
  rxFilter?: "all" | "otc" | "rx";
  prescriptionRequired?: boolean | null;
  sortBy?: "relevance" | "price-asc" | "price-desc" | "price_asc" | "price_desc" | "discount" | "newest" | "featured";
}

export function filterMedicines(options: FilterOptions): Medicine[] {
  const {
    query = "",
    category = "all",
    brands = [],
    minPrice = 0,
    maxPrice = Infinity,
    minDiscount = 0,
    maxDiscount = 100,
    inStockOnly = false,
    rxFilter = "all",
    prescriptionRequired = null,
    sortBy = "relevance",
  } = options;

  return allMedicines
    .filter((item) => {
      // 1. Search Query
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchComp = item.composition.toLowerCase().includes(q);
        const matchBrand = item.brand.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchName && !matchComp && !matchBrand && !matchCategory && !matchDesc) return false;
      }

      // 2. Category Match
      if (category && category !== "all") {
        const catSlug = category.toLowerCase();
        const matchesCategory =
          item.category.toLowerCase() === catSlug ||
          (catSlug === "baby-care" && (item.category === "pediatrics" || item.name.toLowerCase().includes("syrup") || item.name.toLowerCase().includes("drop"))) ||
          (catSlug === "heart" && (item.category === "cardiac" || item.name.toLowerCase().includes("telmi") || item.name.toLowerCase().includes("atorv"))) ||
          (catSlug === "diabetes" && (item.category === "diabetes" || item.name.toLowerCase().includes("metfor") || item.name.toLowerCase().includes("glim") || item.description.toLowerCase().includes("diabet") || item.description.toLowerCase().includes("sugar") || item.category === "digestion")) ||
          (catSlug === "fever-pain" && (item.category === "fever-pain" || item.name.toLowerCase().includes("para") || item.name.toLowerCase().includes("acecl"))) ||
          (catSlug === "eye-care" && (item.name.toLowerCase().includes("drop") || item.category === "vitamins" || item.category === "antibiotics")) ||
          (catSlug === "ayurveda" && (item.category === "digestion" || item.name.toLowerCase().includes("syrup") || item.description.toLowerCase().includes("herbal") || item.category === "vitamins")) ||
          item.description.toLowerCase().includes(catSlug.replace("-", " "));
          
        if (!matchesCategory) return false;
      }

      // 3. Brands
      if (brands.length > 0 && !brands.includes(item.brand)) {
        return false;
      }

      // 4. Price & Discount
      if (item.price < minPrice || item.price > maxPrice) return false;
      if (item.discountPercentage < minDiscount || item.discountPercentage > maxDiscount) return false;

      // 5. Stock
      if (inStockOnly && item.stock <= 0) return false;

      // 6. Prescription
      if (prescriptionRequired !== null && item.prescriptionRequired !== prescriptionRequired) return false;
      if (rxFilter === "otc" && item.prescriptionRequired) return false;
      if (rxFilter === "rx" && !item.prescriptionRequired) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc" || sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price_desc" || sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "discount") return b.discountPercentage - a.discountPercentage;
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      if (sortBy === "featured") return b.rating - a.rating;
      return b.rating - a.rating; // default to relevance/rating
    });
}
