"use client";

import Link from "next/link";
import { Pill } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy login logic
    if (email && password) {
      login({ id: "1", name: "Ayaz Khan", phone: "9876543210", email });
      toast.success("Successfully logged in");
      router.push("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Pill className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-center text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-center text-sm text-slate-500 mb-8">Sign in to your MediGo account to continue</p>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email or Phone Number</label>
            <input 
              type="text" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" 
              placeholder="Email or phone number" 
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <Link href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none relative block w-full px-4 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" 
              placeholder="••••••••" 
            />
          </div>
          
          <button 
            type="submit" 
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-md active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              OTP
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link href="/register" className="font-bold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
