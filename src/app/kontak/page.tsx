"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-lokara-navy text-ivory pt-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-lokara-gold"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold">Contact Us</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8">
              Hubungi <span className="text-gradient">Kami</span>
            </h1>
            <p className="text-ivory/60 text-lg mb-12 max-w-md">
              Punya pertanyaan atau ingin merencanakan perjalanan kustom? Tim kami siap membantu Anda 24/7.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-lokara-gold transition-colors">
                  <Phone className="text-lokara-gold h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ivory/30 mb-1">WhatsApp Business</p>
                  <p className="text-xl font-bold">+62 812 3456 7890</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-lokara-gold transition-colors">
                  <Mail className="text-lokara-gold h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ivory/30 mb-1">Official Email</p>
                  <p className="text-xl font-bold">hello@lokara.id</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-lokara-gold transition-colors">
                  <MapPin className="text-lokara-gold h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ivory/30 mb-1">Office</p>
                  <p className="text-xl font-bold">Seminyak, Bali, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-ivory/30 ml-2">Nama</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-lokara-gold transition-colors" placeholder="Nama Anda" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-ivory/30 ml-2">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-lokara-gold transition-colors" placeholder="email@anda.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-ivory/30 ml-2">Pesan</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-lokara-gold transition-colors h-40 resize-none" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <button className="w-full bg-lokara-gold hover:bg-ivory text-lokara-navy font-black text-xs uppercase tracking-[0.2em] py-5 rounded-full transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)] flex items-center justify-center group">
                Kirim Pesan
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
