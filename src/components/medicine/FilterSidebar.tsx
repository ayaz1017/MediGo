"use client";

import { useFilterStore } from "@/store/filterStore";
import * as Slider from "@radix-ui/react-slider";

const categoriesList = [
  "fever-pain", "diabetes", "heart", "vitamins", "skin-care", "antibiotics", "thyroid", "digestion"
];

const brandsList = [
  "ZenKins Pharma", "Micro Labs Ltd", "Glaxo SmithKline Pharmaceuticals Ltd", "Alkem Laboratories Ltd", "Abbott", "Sun Pharmaceutical Industries Ltd"
];

export default function FilterSidebar() {
  const { 
    categories, toggleCategory,
    brands, toggleBrand,
    minPrice, maxPrice, setPriceRange,
    minDiscount, setMinDiscount,
    prescriptionRequired, setPrescriptionRequired,
    clearFilters
  } = useFilterStore();

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-primary hover:underline">
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-3 text-sm">Categories</h4>
          <div className="space-y-2">
            {categoriesList.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={categories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-600 capitalize">{category.replace("-", " ")}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Brands */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-3 text-sm">Brands</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {brandsList.map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-600 truncate">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-slate-700 text-sm">Price</h4>
            <span className="text-xs text-slate-500">₹{minPrice} - ₹{maxPrice}</span>
          </div>
          <Slider.Root 
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[minPrice, maxPrice]} 
            max={5000} 
            step={10}
            onValueChange={([min, max]) => setPriceRange(min, max)}
          >
            <Slider.Track className="bg-slate-200 relative grow rounded-full h-1.5">
              <Slider.Range className="absolute bg-primary rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-primary shadow-sm rounded-full hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" />
            <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-primary shadow-sm rounded-full hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50" />
          </Slider.Root>
        </div>

        <hr className="border-slate-100" />

        {/* Prescription Required */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-3 text-sm">Prescription Required</h4>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="rx"
                checked={prescriptionRequired === true}
                onChange={() => setPrescriptionRequired(true)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-600">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="rx"
                checked={prescriptionRequired === false}
                onChange={() => setPrescriptionRequired(false)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-600">No</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
