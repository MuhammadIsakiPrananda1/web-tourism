"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface DashboardSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  title?: string;
}

export const DashboardSelect = ({ label, value, onChange, options, title }: DashboardSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <div className="relative">
        <select
          title={title || label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all appearance-none cursor-pointer hover:bg-white/10"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-lokara-navy text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};
