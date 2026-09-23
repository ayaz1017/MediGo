import { Star, CheckCircle, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    city: "Mumbai, Maharashtra",
    initials: "RS",
    rating: 5,
    quote: "As a practicing physician, I was initially sceptical about generic delivery platforms. MediQuick's medicines from ZenKins have the exact same bioequivalence and chemical efficacy as branded equivalents. My family saved over ₹4,500 last month alone.",
    badge: "Verified Buyer & Doctor",
  },
  {
    id: 2,
    name: "Pooja Verma",
    city: "Bengaluru, Karnataka",
    initials: "PV",
    rating: 5,
    quote: "My mother requires chronic medications for hypertension and diabetes every single month. Earlier our pharmacy bill was ₹3,800. With MediQuick generics, it dropped to just ₹820 with free express delivery. Incredible service!",
    badge: "Verified Buyer",
  },
  {
    id: 3,
    name: "Amitabh Sen",
    city: "Kolkata, West Bengal",
    initials: "AS",
    rating: 5,
    quote: "Prescription verification was done in under 5 minutes. The packaging is premium alu-alu and blister packs with full batch numbers and expiry. Delivery arrived in 90 minutes right to my flat.",
    badge: "Verified Buyer",
  },
];

export default function Testimonials() {
  return (
    <section className="py-14 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">REAL REVIEWS</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">What Our Patients Say</h2>
          <p className="text-sm text-slate-500 mt-2">Over 2,00,000+ happy customers trust MediQuick for their monthly prescription needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-green-50 transition-colors w-12 h-12 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic relative z-10">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-black text-sm flex items-center justify-center border border-primary/20 shrink-0">
                  {rev.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-tight">{rev.name}</h4>
                  <p className="text-xs text-slate-400">{rev.city}</p>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-green-700 mt-0.5">
                    <CheckCircle size={12} />
                    <span>{rev.badge}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
