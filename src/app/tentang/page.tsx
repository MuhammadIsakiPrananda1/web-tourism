"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Award, Users, Map } from "lucide-react";

export default function TentangPage() {
  const stats = [
    { label: "Destinasi Eksklusif", value: "50+", icon: Map },
    { label: "Pelanggan Puas", value: "10k+", icon: Users },
    { label: "Penghargaan", value: "15", icon: Award },
    { label: "Keamanan Terjamin", value: "100%", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-lokara-navy text-ivory">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?q=80&w=2070"
            alt="About LOKARA"
            fill
            className="object-cover opacity-40 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-lokara-navy/60 via-lokara-navy/40 to-lokara-navy"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-lokara-gold"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold">Warisan Nusantara</span>
              <div className="w-12 h-[2px] bg-lokara-gold"></div>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6">
              Tentang <span className="text-gradient">LOKARA</span>
            </h1>
            <p className="text-ivory/60 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Mewujudkan perjalanan impian Anda dengan sentuhan kemewahan dan kurasi destinasi paling autentik di seluruh Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
              Visi Kami Adalah <br />
              <span className="text-lokara-gold">Menghidupkan Jiwa Petualang</span>
            </h2>
            <p className="text-ivory/60 text-lg leading-relaxed">
              LOKARA lahir dari keinginan untuk memperkenalkan sisi Indonesia yang jarang terlihat. Kami bukan sekadar agen perjalanan; kami adalah kurator pengalaman yang percaya bahwa setiap sudut Nusantara menyimpan keajaiban yang layak dinikmati dengan cara yang paling istimewa.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-3 text-lokara-gold">
                    <stat.icon className="h-5 w-5" />
                    <span className="text-2xl font-black tracking-tighter">{stat.value}</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-ivory/30">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938"
              alt="Experience"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-lokara-navy/60 to-transparent"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
