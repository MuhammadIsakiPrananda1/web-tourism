"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Hotel, 
  Ticket, 
  Map, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { showToast } from "@/components/ui/Toast";

import Image from "next/image";

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Hotels", icon: Hotel, href: "/dashboard/hotels" },
  { name: "Tickets", icon: Ticket, href: "/dashboard/tickets" },
  { name: "Bookings", icon: CalendarCheck, href: "/dashboard/bookings" },
  { name: "Destinations", icon: Map, href: "/dashboard/destinations" },
  { name: "Users", icon: Users, href: "/dashboard/users" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    showToast("Successfully logged out", "success");
    router.push("/dashboard/login");
  };

  return (
    <div className="flex flex-col h-screen w-64 glass-dark border-r border-white/10 text-white sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-lg group-hover:border-lokara-gold/50 transition-all duration-500">
            <Image src="/lokara_logo.webp" alt="LOKARA Logo" fill className="object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1">
              <span className="font-black text-xl tracking-tighter uppercase text-lokara-gold">
                LOKARA
              </span>
              <span className="text-[10px] font-black text-white px-1.5 py-0.5 bg-lokara-gold/20 rounded border border-lokara-gold/30">
                ADMIN
              </span>
            </div>
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/40 group-hover:text-white/70 transition-colors">
              Indonesia
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? "bg-lokara-gold/10 text-lokara-gold" 
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${isActive ? "text-lokara-gold" : "group-hover:text-lokara-gold"} transition-colors`} />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="w-1.5 h-1.5 rounded-full bg-lokara-gold"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/5">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group ${
            pathname === "/dashboard/settings" 
              ? "bg-lokara-gold/10 text-lokara-gold" 
              : "hover:bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          <span className="font-medium">Settings</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 w-full text-left mt-2 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
