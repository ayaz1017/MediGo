import { Search, ShoppingBag, CreditCard, Truck } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Search Medicines",
    desc: "Search by brand name or active generic composition to compare price and savings.",
    icon: Search,
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    step: "02",
    title: "Add to Cart",
    desc: "Select dosage and quantity, then upload doctor prescription if required for Schedule H items.",
    icon: ShoppingBag,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    step: "03",
    title: "Pay Securely",
    desc: "Choose UPI (PhonePe, GPay, BHIM, CRED), Credit/Debit Card, Net Banking, or Cash on Delivery.",
    icon: CreditCard,
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    step: "04",
    title: "Fast Delivery",
    desc: "Dispatched from temperature-controlled pharmacies with doorstep delivery in 2 hours.",
    icon: Truck,
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-14 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">SIMPLE & TRANSPARENT</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">How MediQuick Works</h2>
          <p className="text-sm text-slate-500 mt-2">Get genuine certified generic medicines delivered to your doorstep in 4 simple steps</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-slate-50/70 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Step number badge */}
                <div className="absolute top-4 right-4 text-3xl font-black text-slate-200 group-hover:text-primary/20 transition-colors">
                  {item.step}
                </div>

                <div className={`w-14 h-14 rounded-2xl ${item.color} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs`}>
                  <Icon size={26} className="stroke-[2]" />
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
