import Link from "next/link";
import { 
  Flame, 
  Activity, 
  Heart, 
  Sparkles, 
  Smile, 
  Eye, 
  Baby, 
  Leaf, 
  ArrowRight 
} from "lucide-react";

const categories = [
  { id: "1", name: "Fever & Pain", icon: Flame, slug: "fever-pain", count: "14 Medicines", color: "bg-red-50 text-red-600 border-red-100" },
  { id: "2", name: "Diabetes", icon: Activity, slug: "diabetes", count: "8 Medicines", color: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: "3", name: "Heart Care", icon: Heart, slug: "heart", count: "9 Medicines", color: "bg-rose-50 text-rose-600 border-rose-100" },
  { id: "4", name: "Vitamins", icon: Sparkles, slug: "vitamins", count: "12 Products", color: "bg-amber-50 text-amber-600 border-amber-100" },
  { id: "5", name: "Skin Care", icon: Smile, slug: "skin-care", count: "11 Products", color: "bg-pink-50 text-pink-600 border-pink-100" },
  { id: "6", name: "Eye Care", icon: Eye, slug: "eye-care", count: "6 Medicines", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  { id: "7", name: "Baby Care", icon: Baby, slug: "baby-care", count: "5 Products", color: "bg-purple-50 text-purple-600 border-purple-100" },
  { id: "8", name: "Ayurveda", icon: Leaf, slug: "ayurveda", count: "10 Medicines", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
];

export default function CategoryGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">CATEGORIES</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Shop by Category</h2>
          </div>
          <Link
            href="/medicines"
            className="text-xs sm:text-sm font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 group"
          >
            All Categories <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col items-center p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md text-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.color} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon size={26} className="stroke-[2]" />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-primary transition-colors leading-tight mb-1">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-medium text-slate-400">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
