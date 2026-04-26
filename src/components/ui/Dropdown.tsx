"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function Dropdown({ options, value, onChange, placeholder = "Select option", label }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full md:w-72" ref={dropdownRef}>
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold/50 mb-3 block ml-4">
          {label}
        </label>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={label || "Toggle dropdown"}
        title={label || "Toggle"}
        className={`
          w-full flex items-center justify-between px-7 py-4 
          bg-white/[0.03] border backdrop-blur-2xl rounded-full
          transition-all duration-500 group relative overflow-hidden
          ${isOpen 
            ? "border-lokara-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
            : "border-white/10 hover:border-lokara-gold/40 hover:bg-white/[0.06]"}
        `}
      >
        <span className={`text-xs font-black uppercase tracking-widest ${selectedOption ? "text-ivory" : "text-ivory/30"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`h-4 w-4 text-lokara-gold transition-all duration-500 ${isOpen ? "rotate-180 scale-110" : "group-hover:translate-y-0.5"}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute z-50 w-full mt-4 overflow-hidden bg-[#0a0f1d]/95 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="p-2.5">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-6 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all duration-300 mb-1 last:mb-0
                    ${value === option.value 
                      ? "bg-lokara-gold text-lokara-navy shadow-[0_5px_15px_rgba(212,175,55,0.3)]" 
                      : "text-ivory/50 hover:text-lokara-gold hover:bg-white/[0.05]"}
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
