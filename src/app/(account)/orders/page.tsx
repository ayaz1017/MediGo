"use client";

import { Package, ChevronRight } from "lucide-react";
import Link from "next/link";

const mockOrders = [
  {
    id: "OD9876543210",
    date: "2026-09-20",
    status: "Delivered",
    total: 350,
    items: ["Dolo 650 Tablet", "Volini Spray"],
  },
  {
    id: "OD1234567890",
    date: "2026-09-22",
    status: "Confirmed",
    total: 180,
    items: ["Augmentin 625 Duo Tablet"],
  }
];

export default function OrdersPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Orders</h2>
      
      <div className="space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="border border-slate-200 rounded-xl p-4 sm:p-6 hover:border-primary/50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-slate-900">{order.id}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                    order.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-slate-500 mb-1">Total Amount</p>
                <p className="font-bold text-slate-900">₹{order.total}</p>
              </div>
            </div>
            
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Package size={18} className="text-slate-400" />
                <span className="truncate max-w-[200px] sm:max-w-md">{order.items.join(", ")}</span>
              </div>
              <Link href="#" className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark">
                View Details <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
