"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Search, ShoppingBag, User } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Categories", href: "/medicines", icon: Grid },
    { label: "Search", href: "/search", icon: Search },
    { label: "Orders", href: "/orders", icon: ShoppingBag },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav aria-label="Mobile navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
              isActive ? "text-primary font-bold" : "text-slate-500 hover:text-slate-900 font-medium"
            }`}
          >
            <Icon size={20} className={isActive ? "stroke-[2.5]" : "stroke-[1.75]"} />
            <span className="text-[11px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
