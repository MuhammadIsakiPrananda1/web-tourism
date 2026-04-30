"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BlogPage() {
  const posts = [
    { title: "5 Hidden Gems di Timur Indonesia", category: "Travel Guide", date: "24 April 2026", id: 1 },
    { title: "Seni Menikmati Kemewahan yang Autentik", category: "Lifestyle", date: "20 April 2026", id: 2 },
    { title: "Tips Packing untuk Ekspedisi Tropis", category: "Tips", date: "15 April 2026", id: 3 },
  ];

  return (
    <div className="min-h-screen bg-lokara-navy text-ivory pt-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-lokara-gold"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold">Lokara Journal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            Cerita & <span className="text-gradient">Inspirasi</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[300px] rounded-[32px] overflow-hidden border border-white/10 mb-6">
                <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                <div className="absolute inset-0 bg-linear-to-t from-lokara-navy to-transparent opacity-60"></div>
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-lokara-gold text-lokara-navy text-[10px] font-black uppercase tracking-widest rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-lokara-gold transition-colors">{post.title}</h3>
              <p className="text-xs font-bold text-ivory/30 uppercase tracking-[0.2em]">{post.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
