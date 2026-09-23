import Link from "next/link";
import { ArrowRight, Sparkles, Percent, Heart, ShieldPlus } from "lucide-react";

const offers = [
  {
    id: 1,
    gradient: "from-emerald-700 via-green-600 to-teal-700",
    eyebrow: "MEGA GENERIC FEST",
    headline: "Up to 80% Off on Generics",
    subtext: "Replace expensive branded medicines with identical certified generic salts.",
    cta: "Shop Generics",
    href: "/medicines?filter=generics",
    icon: Percent,
  },
  {
    id: 2,
    gradient: "from-amber-600 via-orange-500 to-red-500",
    eyebrow: "SPECIAL HEALTH WEEK",
    headline: "Diabetes Wellness Week",
    subtext: "Save extra 25% on glucometers, strips, and maintenance medications.",
    cta: "Explore Deals",
    href: "/medicines?category=diabetes",
    icon: Sparkles,
  },
  {
    id: 3,
    gradient: "from-blue-700 via-indigo-600 to-cyan-700",
    eyebrow: "WELCOME REWARD",
    headline: "Flat ₹150 Off First Order",
    subtext: "Use coupon FIRST150 at checkout on any order above ₹599.",
    cta: "Claim Discount",
    href: "/offers",
    icon: ShieldPlus,
  },
  {
    id: 4,
    gradient: "from-purple-800 via-purple-600 to-pink-600",
    eyebrow: "CARDIAC CARE",
    headline: "Heart Medicine Savings",
    subtext: "High-grade cardiovascular therapies and supplements with doorstep delivery.",
    cta: "View Medicines",
    href: "/medicines?category=heart",
    icon: Heart,
  },
];

export default function OffersBanner() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent">PROMOTIONS</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Deals & Offers</h2>
          </div>
          <Link
            href="/offers"
            className="text-xs sm:text-sm font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 group"
          >
            All Offers <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${offer.gradient} text-white p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between`}
              >
                {/* Subtle decorative background circle */}
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase">
                      {offer.eyebrow}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black leading-tight mb-2">
                    {offer.headline}
                  </h3>

                  <p className="text-sm text-white/90 leading-relaxed mb-6 max-w-md">
                    {offer.subtext}
                  </p>
                </div>

                <div>
                  <Link
                    href={offer.href}
                    className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-md transition group-hover:gap-3"
                  >
                    <span>{offer.cta}</span>
                    <ArrowRight size={15} className="text-primary" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
