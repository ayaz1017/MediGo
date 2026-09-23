"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Upload } from "lucide-react";

const subLinks = [
  { label: "Home", href: "/" },
  { label: "All Medicines", href: "/medicines" },
  { label: "Generic Medicines", href: "/medicines?filter=generics" },
  { label: "Diabetes", href: "/medicines?category=diabetes" },
  { label: "Heart Health", href: "/medicines?category=heart" },
  { label: "Skincare", href: "/medicines?category=skin-care" },
  { label: "Baby Care", href: "/medicines?category=baby-care" },
  { label: "Ayurveda", href: "/medicines?category=ayurveda" },
  { label: "Lab Tests", href: "/medicines?category=lab-tests" },
  { label: "Today's Deals", href: "/offers", isHot: true },
  { label: "Upload Prescription", href: "/prescriptions", isUpload: true },
];

export default function SubNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs hidden md:block">
      <div className="container mx-auto px-4">
        <ul className="flex items-center gap-1 overflow-x-auto hide-scrollbar py-2 text-xs font-semibold text-slate-700 whitespace-nowrap">
          {subLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label} className="shrink-0">
                <Link
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 transition-colors ${
                    item.isHot
                      ? "text-red-600 bg-red-50 hover:bg-red-100 font-bold"
                      : item.isUpload
                      ? "text-primary bg-green-50 hover:bg-green-100 font-bold ml-2 border border-primary/20"
                      : isActive
                      ? "bg-primary text-white"
                      : "hover:bg-slate-100 hover:text-primary text-slate-600"
                  }`}
                >
                  {item.isHot && <Sparkles size={13} className="text-red-500 fill-current animate-pulse" />}
                  {item.isUpload && <Upload size={13} className="text-primary" />}
                  {item.label}
                  {item.isHot && (
                    <span className="bg-red-500 text-white text-[9px] uppercase px-1.5 py-0.2 rounded-full font-black tracking-wider">
                      HOT
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
