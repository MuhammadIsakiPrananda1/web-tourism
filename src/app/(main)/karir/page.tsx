"use client";

import { motion } from "framer-motion";
import { Briefcase, Rocket, Star, ShieldCheck } from "lucide-react";

export default function KarirPage() {
  const jobs = [
    { title: "Travel Curator", type: "Full-time", location: "Bali/Remote", id: 1 },
    { title: "Content Strategist", type: "Full-time", location: "Jakarta", id: 2 },
    { title: "Customer Success (Luxury)", type: "Full-time", location: "Remote", id: 3 },
  ];

  return (
    <div className="min-h-screen bg-lokara-navy text-ivory pt-48 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-lokara-gold"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold">Join Our Team</span>
            <div className="w-12 h-[2px] bg-lokara-gold"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            Membangun <span className="text-gradient">Masa Depan</span> <br /> Perjalanan
          </h1>
          <p className="text-ivory/60 text-lg">
            Bantu kami mendefinisikan ulang kemewahan dan petualangan di Nusantara.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-20">
          {jobs.map((job) => (
            <motion.div 
              key={job.id}
              whileHover={{ x: 10 }}
              className="p-8 rounded-[32px] bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between group cursor-pointer hover:border-lokara-gold transition-all"
            >
              <div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-lokara-gold transition-colors">{job.title}</h3>
                <div className="flex gap-4 text-xs font-bold text-ivory/40 uppercase tracking-widest">
                  <span>{job.type}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                </div>
              </div>
              <button className="mt-6 md:mt-0 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-widest hover:bg-lokara-gold hover:text-lokara-navy transition-all">
                Lamar Sekarang
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
