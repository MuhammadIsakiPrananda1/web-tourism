"use client";

import React from "react";
import { Search, Bell, User } from "lucide-react";

export const TopNav = () => {
  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-lokara-navy/30 backdrop-blur-xl sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-lokara-gold transition-colors" />
          <input
            type="text"
            placeholder="Search bookings, hotels..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-hidden focus:border-lokara-gold/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors group" aria-label="Notifications">
          <Bell className="w-5 h-5 group-hover:shake" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-lokara-gold rounded-full border-2 border-lokara-navy" />
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-lokara-gold to-lokara-gold-dark p-px">
            <div className="w-full h-full rounded-xl bg-lokara-navy flex items-center justify-center">
              <User className="w-5 h-5 text-lokara-gold" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
