"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  label: string;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function QuantitySelector({ label, min = 1, max = 10, onChange }: QuantitySelectorProps) {
  const [count, setCount] = useState(min);

  const increment = () => {
    if (count < max) {
      const newVal = count + 1;
      setCount(newVal);
      onChange?.(newVal);
    }
  };

  const decrement = () => {
    if (count > min) {
      const newVal = count - 1;
      setCount(newVal);
      onChange?.(newVal);
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10 flex justify-between items-center group focus-within:border-lokara-gold transition-colors">
      <label className="text-[10px] font-black text-ivory/30 uppercase tracking-wider block">{label}</label>
      <div className="flex items-center gap-4">
        <button 
          onClick={decrement}
          aria-label="Decrease quantity"
          title="Decrease"
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-ivory/60 hover:border-lokara-gold hover:text-lokara-gold transition-all active:scale-90"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="font-black text-ivory min-w-[12px] text-center">{count}</span>
        <button 
          onClick={increment}
          aria-label="Increase quantity"
          title="Increase"
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-ivory/60 hover:border-lokara-gold hover:text-lokara-gold transition-all active:scale-90"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
