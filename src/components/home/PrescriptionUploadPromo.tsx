import Link from "next/link";
import { Upload, FileCheck, ArrowRight, ShieldCheck } from "lucide-react";

export default function PrescriptionUploadPromo() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold border border-primary/30">
                <FileCheck size={16} />
                <span>Instant Pharmacist Verification</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Upload your prescription <span className="text-primary">→ We find the generic equivalent</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Save up to 80% on medical expenses. Our licensed pharmacists review your prescription, match every brand with identical certified active salts, and deliver in 2 hours.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary" /> 100% Confidential</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary" /> Verified by Registered Pharmacist</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary" /> Free Doorstep Delivery</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center sm:items-stretch gap-3 w-full sm:w-auto">
              <Link
                href="/prescriptions"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-primary/30 transition transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto text-center"
              >
                <Upload size={20} />
                <span>Upload Prescription Now</span>
              </Link>
              <p className="text-center text-[11px] text-slate-400">Supported: JPG, PNG, PDF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
