import { ShieldCheck, Truck, PiggyBank, CheckCircle } from "lucide-react";

const trustItems = [
  {
    icon: CheckCircle,
    title: "WHO-GMP Certified",
    subtitle: "Lab verified quality & active salts",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    subtitle: "Free express delivery above ₹499",
  },
  {
    icon: PiggyBank,
    title: "Up to 80% Savings",
    subtitle: "Affordable authentic generic pricing",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine",
    subtitle: "Directly sourced from licensed pharma",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-primary-dark text-white py-5 shadow-sm border-b border-green-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-2 sm:p-3 rounded-xl hover:bg-white/5 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-300">
                  <Icon size={22} className="stroke-[2.25]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight text-white flex items-center gap-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-green-100/80 leading-snug mt-0.5 hidden sm:block">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
