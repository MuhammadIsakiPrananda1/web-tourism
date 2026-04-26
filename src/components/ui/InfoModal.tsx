"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        {/* Backdrop - Removed onClick to prevent accidental closure */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-lokara-navy/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0f1d] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-ivory/40 hover:text-ivory transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-8 md:p-12 overflow-y-auto scrollbar-hide">
            <h2 className="text-3xl font-black text-ivory tracking-tighter mb-8 uppercase">
              {title}
            </h2>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-ivory/60 leading-relaxed text-lg whitespace-pre-line">
                {content}
              </p>
            </div>
          </div>

          <div className="p-6 border-t border-white/5 bg-white/5 flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-lokara-gold text-lokara-navy font-black text-[10px] uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
