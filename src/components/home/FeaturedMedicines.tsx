import { allMedicines } from "@/data/medicines";
import MedicineCard from "../medicine/MedicineCard";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";

const bestSellers = allMedicines.slice(0, 10);

export default function FeaturedMedicines() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent">
              <Flame size={15} className="fill-current text-accent" />
              <span>POPULAR GENERICS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Best Sellers</h2>
            <p className="text-sm text-slate-500 mt-0.5">Most prescribed generic formulations ordered by 50,000+ patients</p>
          </div>
          <Link 
            href="/medicines" 
            className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors group"
          >
            <span>View All ({allMedicines.length})</span> 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* 5-Column Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {bestSellers.map(medicine => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link 
            href="/medicines" 
            className="inline-flex items-center justify-center gap-2 w-full py-3 text-primary font-bold border-2 border-primary rounded-full hover:bg-primary hover:text-white transition"
          >
            View All {allMedicines.length} Medicines <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
