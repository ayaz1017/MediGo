"use client";

import { MapPin, Plus, Trash2, Edit2 } from "lucide-react";

export default function AddressesPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Saved Addresses</h2>
        <button className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={18} />
          Add New Address
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border-2 border-slate-200 rounded-xl p-5 hover:border-primary/50 transition-colors relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-slate-900">Ayaz Khan</span>
            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">Home</span>
          </div>
          <p className="text-sm text-slate-600 mb-1">123, Tech Park, Link Road, Andheri West</p>
          <p className="text-sm text-slate-600 font-medium mb-3">Mumbai, Maharashtra 400053</p>
          <p className="text-sm text-slate-600">📞 +91 9876543210</p>
          
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-md transition-colors">
              <Edit2 size={16} />
            </button>
            <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
