"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showTentang, setShowTentang] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showTentang && !(event.target as HTMLElement).closest(".tentang-dropdown-container")) {
        setShowTentang(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTentang]);

  return (
    <>
      <nav className="fixed w-full z-50 flex justify-center pt-4 px-4">
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl glass-dark rounded-full px-6 py-4 flex items-center justify-between shadow-2xl border border-white/10"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-lg group-hover:border-lokara-gold/50 transition-all duration-500">
              <Image src="/lokara_logo.webp" alt="LOKARA Logo" fill className="object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-xl tracking-tighter uppercase text-lokara-gold">
                LOKARA
              </span>
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/40 group-hover:text-white/70 transition-colors">
                Indonesia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-ivory/60 hover:text-lokara-gold transition-colors">Beranda</Link>
            
            {/* Dropdown Tentang */}
            <div className="relative tentang-dropdown-container">
              <button 
                onClick={() => setShowTentang(!showTentang)}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${showTentang ? 'text-lokara-gold' : 'text-ivory/60 hover:text-lokara-gold'}`}
              >
                Tentang <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showTentang ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showTentang && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-4 w-48 z-50"
                  >
                    <div className="glass-dark rounded-2xl overflow-hidden border border-white/10 p-2 shadow-2xl">
                      <Link href="/tentang" onClick={() => setShowTentang(false)} className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-ivory/60 hover:text-lokara-gold hover:bg-white/5 rounded-xl transition-all">Tentang Kami</Link>
                      <Link href="/karir" onClick={() => setShowTentang(false)} className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-ivory/60 hover:text-lokara-gold hover:bg-white/5 rounded-xl transition-all">Karir</Link>
                      <Link href="/blog" onClick={() => setShowTentang(false)} className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-ivory/60 hover:text-lokara-gold hover:bg-white/5 rounded-xl transition-all">Blog</Link>
                      <Link href="/kontak" onClick={() => setShowTentang(false)} className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-ivory/60 hover:text-lokara-gold hover:bg-white/5 rounded-xl transition-all">Kontak</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/wisata" className="text-[10px] font-black uppercase tracking-[0.2em] text-ivory/60 hover:text-lokara-gold transition-colors">Wisata</Link>
            <Link href="/hotel" className="text-[10px] font-black uppercase tracking-[0.2em] text-ivory/60 hover:text-lokara-gold transition-colors">Hotel</Link>
            <Link href="/aktivitas" className="text-[10px] font-black uppercase tracking-[0.2em] text-ivory/60 hover:text-lokara-gold transition-colors">Aktivitas</Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              className="text-ivory/40 hover:text-lokara-gold transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="px-8 py-3 bg-white/5 hover:bg-lokara-gold text-ivory hover:text-lokara-navy border border-white/10 hover:border-lokara-gold rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-lokara-gold"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </motion.div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden p-4 pt-24"
          >
            <div className="absolute inset-0 bg-lokara-navy/90 backdrop-blur-xl" onClick={() => setIsOpen(false)}></div>
            <div className="relative glass-dark rounded-[40px] border border-white/10 p-8 shadow-2xl flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <Link href="/" className="text-2xl font-black text-ivory" onClick={() => setIsOpen(false)}>Beranda</Link>
                
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold">Tentang Kami</span>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/tentang" className="text-lg font-bold text-ivory/60" onClick={() => setIsOpen(false)}>Profil</Link>
                    <Link href="/karir" className="text-lg font-bold text-ivory/60" onClick={() => setIsOpen(false)}>Karir</Link>
                    <Link href="/blog" className="text-lg font-bold text-ivory/60" onClick={() => setIsOpen(false)}>Blog</Link>
                    <Link href="/kontak" className="text-lg font-bold text-ivory/60" onClick={() => setIsOpen(false)}>Kontak</Link>
                  </div>
                </div>

                <Link href="/wisata" className="text-2xl font-black text-ivory" onClick={() => setIsOpen(false)}>Wisata</Link>
                <Link href="/hotel" className="text-2xl font-black text-ivory" onClick={() => setIsOpen(false)}>Hotel</Link>
                <Link href="/aktivitas" className="text-2xl font-black text-ivory" onClick={() => setIsOpen(false)}>Aktivitas</Link>
              </div>
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-5 bg-lokara-gold text-lokara-navy font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl active:scale-95 transition-transform"
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
