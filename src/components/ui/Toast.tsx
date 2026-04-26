"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export type ToastType = "success" | "error";

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
}

export default function Toast({ id, message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 0, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className={`flex items-center gap-4 p-3 pr-5 rounded-2xl shadow-2xl border backdrop-blur-xl min-w-[320px] max-w-[400px] ${
        type === "success" 
          ? "bg-lokara-navy/80 border-lokara-gold/30" 
          : "bg-lokara-navy/80 border-red-500/30"
      }`}
    >
      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
        <Image src="/lokara_logo.webp" alt="LOKARA" fill className="object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${
            type === "success" ? "text-lokara-gold" : "text-red-400"
          }`}>
            LOKARA | {type === "success" ? "Success" : "Error"}
          </span>
        </div>
        <p className="text-[13px] font-bold text-ivory/90 leading-snug truncate">
          {message}
        </p>
      </div>

      <button 
        onClick={() => onClose(id)}
        aria-label="Close"
        className="p-1.5 hover:bg-white/5 rounded-full transition-colors group"
      >
        <X className="h-4 w-4 text-ivory/30 group-hover:text-ivory transition-colors" />
      </button>
    </motion.div>
  );
}

// Global Toast Manager to be used in Layout
export function ToastContainer() {
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);

  useEffect(() => {
    const handleToast = (event: any) => {
      const { message, type } = event.detail;
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);
    };

    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-24 right-6 z-100 flex flex-col gap-3 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast 
              key={toast.id} 
              id={toast.id} 
              message={toast.message} 
              type={toast.type} 
              onClose={removeToast} 
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper to trigger toast from anywhere
export const showToast = (message: string, type: ToastType = "success") => {
  const event = new CustomEvent("show-toast", { detail: { message, type } });
  window.dispatchEvent(event);
};
