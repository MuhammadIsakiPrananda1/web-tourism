"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { showToast } from "@/components/ui/Toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "login" | "register" | "reset";

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);

  // Disable scroll when modal is open
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
        {/* Backdrop */}
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
          className="relative w-full max-w-lg bg-[#0a0f1d] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            aria-label="Close modal"
            title="Close"
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-ivory/40 hover:text-ivory transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-ivory tracking-tighter mb-2">
                {mode === "login" ? "Selamat Datang" : mode === "register" ? "Buat Akun Baru" : "Lupa Password?"}
              </h2>
              <p className="text-ivory/40 text-sm font-medium">
                {mode === "login" 
                  ? "Masuk untuk melanjutkan petualangan Anda bersama LOKARA" 
                  : mode === "register" 
                  ? "Bergabunglah dengan komunitas eksklusif penjelajah modern"
                  : "Masukkan email Anda untuk menerima instruksi reset password"}
              </p>
            </div>

            {/* Social Logins (Hidden for Reset) */}
            {mode !== "reset" && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-2xl hover:bg-white/10 transition-all group">
                  <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs font-black uppercase tracking-widest text-ivory">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 bg-[#1877F2]/10 border border-[#1877F2]/20 py-3 rounded-2xl hover:bg-[#1877F2]/20 transition-all group">
                  <svg className="h-5 w-5 fill-[#1877F2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-xs font-black uppercase tracking-widest text-[#1877F2]">Facebook</span>
                </button>
              </div>
            )}

            {mode !== "reset" && (
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-[0.3em]">
                  <span className="bg-[#0a0f1d] px-4 text-ivory/20 font-black">Atau</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form 
              className="space-y-5" 
              onSubmit={(e) => {
                e.preventDefault();
                const action = mode === "login" ? "Masuk" : mode === "register" ? "Daftar" : "Reset";
                showToast(`Berhasil ${action}! Selamat menjelajah LOKARA.`, "success");
                onClose();
              }}
            >
              {mode === "register" && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-ivory/20 group-focus-within:text-lokara-gold transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-ivory placeholder:text-ivory/20 outline-none focus:border-lokara-gold focus:ring-1 focus:ring-lokara-gold/20 transition-all"
                  />
                </div>
              )}

              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-ivory/20 group-focus-within:text-lokara-gold transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input 
                  type="email" 
                  placeholder="Alamat Email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-ivory placeholder:text-ivory/20 outline-none focus:border-lokara-gold focus:ring-1 focus:ring-lokara-gold/20 transition-all"
                />
              </div>

              {mode !== "reset" && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-ivory/20 group-focus-within:text-lokara-gold transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Kata Sandi"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-14 text-ivory placeholder:text-ivory/20 outline-none focus:border-lokara-gold focus:ring-1 focus:ring-lokara-gold/20 transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-5 flex items-center text-ivory/20 hover:text-ivory transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              )}

              {mode === "login" && (
                <div className="text-right">
                  <button 
                    type="button"
                    onClick={() => setMode("reset")}
                    className="text-[10px] font-black uppercase tracking-widest text-lokara-gold hover:text-ivory transition-colors"
                  >
                    Lupa Kata Sandi?
                  </button>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-lokara-gold hover:bg-ivory text-lokara-navy font-black text-xs uppercase tracking-[0.2em] py-5 rounded-2xl transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)] flex items-center justify-center group"
              >
                {mode === "login" ? "Masuk Sekarang" : mode === "register" ? "Daftar Akun" : "Kirim Link Reset"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-10 text-center">
              <p className="text-ivory/30 text-xs font-bold">
                {mode === "login" ? (
                  <>
                    Belum punya akun?{" "}
                    <button onClick={() => setMode("register")} className="text-lokara-gold hover:underline ml-1">Daftar di sini</button>
                  </>
                ) : mode === "register" ? (
                  <>
                    Sudah punya akun?{" "}
                    <button onClick={() => setMode("login")} className="text-lokara-gold hover:underline ml-1">Masuk sekarang</button>
                  </>
                ) : (
                  <button onClick={() => setMode("login")} className="text-lokara-gold hover:underline">Kembali ke halaman Masuk</button>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
