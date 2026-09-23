import { Smartphone, Star, Download, QrCode } from "lucide-react";

export default function AppDownloadBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white p-8 sm:p-12 shadow-xl">
          {/* Decorative background blur */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="space-y-4 text-center lg:text-left max-w-xl">
              <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-white/15">
                <Smartphone size={14} /> MediQuick Mobile App
              </span>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Order medicines in seconds with our mobile app
              </h2>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Enjoy 1-click refills, live temperature delivery tracking, daily dosage pill reminders, and exclusive app-only flat discounts.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/15 text-center sm:text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">2M+</div>
                  <div className="text-xs text-slate-300">Active Patients</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white flex items-center justify-center sm:justify-start gap-1">
                    4.8 <Star size={16} className="text-yellow-400 fill-current" />
                  </div>
                  <div className="text-xs text-slate-300">App Store Rating</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-300">80%</div>
                  <div className="text-xs text-slate-300">Max Savings</div>
                </div>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href="#"
                className="flex items-center gap-3 bg-black hover:bg-slate-900 border border-white/20 text-white px-6 py-3.5 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="text-2xl">🍎</div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 leading-none uppercase font-semibold">Download on</p>
                  <p className="text-sm font-black leading-tight">App Store</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 bg-black hover:bg-slate-900 border border-white/20 text-white px-6 py-3.5 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="text-2xl">🤖</div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 leading-none uppercase font-semibold">Get it on</p>
                  <p className="text-sm font-black leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
