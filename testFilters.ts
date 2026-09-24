import { filterMedicines } from "./src/utils/filterMedicines";

console.log("Check 1 (Category Tiles):");
const categories = ["fever-pain", "diabetes", "heart", "vitamins", "skin-care", "eye-care", "baby-care", "ayurveda"];
for (const cat of categories) {
  const result = filterMedicines({ category: cat });
  console.log(`Slug /categories/${cat} -> returned ${result.length} results`);
  if (result.length === 0) {
    console.log(`[FAIL] ${cat} returned 0 results!`);
  }
}

console.log("\nCheck 2 (Discount Filter):");
const beforeCount = filterMedicines({}).length;
const afterCount = filterMedicines({ minDiscount: 50 }).length;
const firstFew = filterMedicines({ minDiscount: 50 }).slice(0, 3).map(m => `${m.name} (${m.discountPercentage}% OFF)`);

console.log(`Before adjusting (minDiscount=0): Showing ${beforeCount} medicines`);
console.log(`After adjusting (minDiscount=50): Showing ${afterCount} medicines`);
console.log(`First few cards:`, firstFew);
