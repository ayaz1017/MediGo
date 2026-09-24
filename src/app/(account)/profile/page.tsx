"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  if (!user) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center max-w-md mx-auto mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Not Logged In</h2>
        <p className="text-slate-500 mb-6">Please sign in to view and manage your profile.</p>
        <Link href="/login" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-dark transition-colors inline-block">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>
        <button 
          onClick={() => {
            logout();
            router.push("/login");
          }} 
          className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
      
      <form className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input 
            type="text" 
            defaultValue={user?.name || "Ayaz Khan"}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
          <input 
            type="tel" 
            defaultValue={user?.phone || "9876543210"}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary bg-slate-50"
            disabled
          />
          <p className="text-xs text-slate-500 mt-1">Phone number cannot be changed.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <input 
            type="email" 
            defaultValue={user?.email || "ayaz@example.com"}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>

        <button type="button" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-sm">
          Save Changes
        </button>
      </form>
    </div>
  );
}
