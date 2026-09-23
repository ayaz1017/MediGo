"use client";

import Link from "next/link";
import { Pill } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Dummy register logic
    toast.success("Account created successfully");
    router.push("/login");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Pill className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        <h2 className="text-center text-2xl font-bold text-slate-900 mb-2">Create an Account</h2>
        <p className="text-center text-sm text-slate-500 mb-8">Join MediGo for a healthier tomorrow</p>
        
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              name="name"
              type="text" 
              required
              value={formData.name}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input 
              name="phone"
              type="tel" 
              required
              value={formData.phone}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" 
              placeholder="+91 98765 43210" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email (Optional)</label>
            <input 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" 
              placeholder="john@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              name="password"
              type="password" 
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" 
              placeholder="••••••••" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
            <input 
              name="confirmPassword"
              type="password" 
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors" 
              placeholder="••••••••" 
            />
          </div>

          <div className="flex items-start mt-4">
            <div className="flex items-center h-5">
              <input id="terms" name="terms" type="checkbox" required className="focus:ring-primary h-4 w-4 text-primary border-slate-300 rounded" />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-slate-700">
                I agree to the <Link href="#" className="text-primary hover:underline">Terms & Conditions</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors shadow-md active:scale-[0.98] mt-6"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
