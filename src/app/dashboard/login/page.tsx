"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { showToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate auth check
    setTimeout(() => {
      if (email === "admin@lokara.com" && password === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        showToast("Welcome back, Admin!", "success");
        router.push("/dashboard");
      } else {
        showToast("Invalid email or password", "error");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-lokara-navy">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lokara-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lokara-gold/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-dark rounded-[40px] border border-white/10 p-8 md:p-12 shadow-2xl relative">
          {/* Logo Area */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-lokara-gold shadow-2xl mb-4">
              <Image src="/lokara_logo.webp" alt="LOKARA Logo" fill className="object-cover" />
            </div>
            <h1 className="text-3xl font-black text-lokara-gold tracking-tighter uppercase">LOKARA CMS</h1>
            <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mt-2">Administrative Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan Email Anda"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-gray-400">Password</label>
                <button type="button" className="text-[10px] font-black uppercase text-lokara-gold hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password Anda"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white focus:outline-hidden focus:border-lokara-gold/50 transition-all placeholder:text-gray-700"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-lokara-gold hover:bg-lokara-gold-dark text-lokara-navy font-black py-4 rounded-2xl shadow-xl shadow-lokara-gold/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-lokara-navy/30 border-t-lokara-navy rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In To Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Only authorized accounts can access the CMS.
              <br />
              Need help? <button className="text-lokara-gold font-bold hover:underline">Contact Support</button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
