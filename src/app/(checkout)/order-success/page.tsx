"use client";

import { motion } from "framer-motion";
import { 
  Check, 
  ChevronRight, 
  Package, 
  Home, 
  Truck, 
  Clock, 
  ShieldCheck, 
  FileText,
  PhoneCall
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    // Generate realistic order ID & formatted current date
    const randomNum = Math.floor(10000000 + Math.random() * 90000000);
    setOrderId(`MQ-${randomNum}`);

    const now = new Date();
    setOrderDate(now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }));
  }, []);

  const orderSteps = [
    { label: "Order Placed", time: "Just now", status: "completed" },
    { label: "Pharmacist Verification", time: "Within 30 mins", status: "current" },
    { label: "Packed & Sealed", time: "Today, 6:00 PM", status: "pending" },
    { label: "Express Out for Delivery", time: "Tomorrow, 2:00 PM", status: "pending" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="max-w-xl w-full bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200 text-center relative overflow-hidden"
      >
        {/* Top Gradient Ribbon */}
        <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-primary via-emerald-400 to-green-500" />
        
        {/* Animated Checkmark Circle */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-inner relative border-2 border-green-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          >
            <Check size={42} className="stroke-[3]" />
          </motion.div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
          Order Confirmed Successfully!
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mb-8 leading-relaxed max-w-md mx-auto">
          Thank you for choosing MediQuick. Your generic medicine package has been scheduled for priority WHO-GMP certified packaging and dispatch.
        </p>

        {/* Order Details Box */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left border border-slate-200 space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200 text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">Order Reference ID:</span>
            <span className="font-mono font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              {orderId || "MQ-84920412"}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">Order Date:</span>
            <span className="font-semibold text-slate-800">{orderDate || "Today"}</span>
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-500 font-medium">Estimated Delivery:</span>
            <span className="font-bold text-primary flex items-center gap-1">
              <Truck size={15} /> Tomorrow, by 2:00 PM
            </span>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="mb-8 text-left">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
            Live Order Status
          </h3>
          <div className="space-y-4 relative">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-200 -z-0" />
            
            {orderSteps.map((s, idx) => (
              <div key={idx} className="flex items-center gap-4 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  s.status === "completed"
                    ? "bg-primary text-white"
                    : s.status === "current"
                    ? "bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}>
                  {s.status === "completed" ? <Check size={14} className="stroke-[3]" /> : idx + 1}
                </div>
                <div className="flex-1 flex items-center justify-between text-xs">
                  <span className={`font-bold ${s.status === "pending" ? "text-slate-400" : "text-slate-800"}`}>
                    {s.label}
                  </span>
                  <span className="text-slate-400 text-[11px] font-medium">{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Banner */}
        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl mb-8 flex items-center gap-3 text-left">
          <PhoneCall size={20} className="text-blue-600 shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-blue-900">Need pharmacist consultation?</p>
            <p className="text-blue-700 text-[11px]">Our licensed pharmacists are on standby at 1800-200-MEDI (Toll Free).</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/medicines" 
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-2xl font-bold hover:bg-primary-dark transition shadow-md active:scale-95 text-xs sm:text-sm"
          >
            Continue Shopping <ChevronRight size={16} />
          </Link>
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 py-3.5 px-6 rounded-2xl font-bold hover:bg-slate-50 transition active:scale-95 text-xs sm:text-sm"
          >
            <Home size={16} /> Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
