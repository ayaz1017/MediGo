import Link from "next/link";
import { ArrowRight } from "lucide-react";

const concerns = [
  { name: "Diabetes", emoji: "🩸", count: "18 Products", slug: "diabetes" },
  { name: "Blood Pressure", emoji: "❤️", count: "14 Products", slug: "heart" },
  { name: "Thyroid Care", emoji: "🦋", count: "9 Products", slug: "thyroid" },
  { name: "Dental Care", emoji: "🦷", count: "12 Products", slug: "fever-pain" },
  { name: "Joint & Bone", emoji: "🦴", count: "16 Products", slug: "fever-pain" },
  { name: "Respiratory", emoji: "🫁", count: "21 Products", slug: "antibiotics" },
  { name: "Mental Health", emoji: "🧠", count: "8 Products", slug: "vitamins" },
  { name: "Immunity", emoji: "🛡️", count: "24 Products", slug: "vitamins" },
  { name: "Eye Care", emoji: "👁️", count: "11 Products", slug: "eye-care" },
  { name: "Women's Health", emoji: "🌸", count: "15 Products", slug: "vitamins" },
  { name: "Nutrition", emoji: "🥗", count: "28 Products", slug: "vitamins" },
  { name: "Kidney Care", emoji: "🫘", count: "7 Products", slug: "digestion" },
];

export default function HealthConcernsGrid() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">TARGETED THERAPY</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Browse by Health Concern</h2>
            <p className="text-sm text-slate-500 mt-0.5">Find high efficacy generic treatments tailored to your condition</p>
          </div>
          <Link
            href="/medicines"
            className="text-xs sm:text-sm font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 group"
          >
            All Conditions <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6x2 Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {concerns.map((concern) => (
            <Link
              key={concern.name}
              href={`/medicines?category=${concern.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-primary p-4 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-green-50 flex items-center justify-center text-2xl mb-2.5 transition-colors">
                <span>{concern.emoji}</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-primary transition-colors leading-tight mb-1">
                {concern.name}
              </h3>
              <span className="text-[11px] font-medium text-slate-400">
                {concern.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
