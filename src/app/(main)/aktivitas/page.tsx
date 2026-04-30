"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
import Skeleton from "@/components/ui/Skeleton";

interface Activity {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

// Data will be fetched from backend
const activities: Activity[] = [];

const sortOptions = [
  { value: "recom", label: "Rekomendasi" },
  { value: "price-asc", label: "Harga: Terendah" },
  { value: "price-desc", label: "Harga: Tertinggi" },
];

export default function AktivitasPage() {
  const [sortBy, setSortBy] = useState("recom");

  return (
    <div className="min-h-screen bg-lokara-navy text-ivory">
      <div className="max-w-7xl mx-auto px-6 py-24 pt-32">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-lokara-gold"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold">Curated Experience</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-ivory tracking-tighter leading-none mb-6">
            Aktivitas <span className="text-gradient">Seru</span>
          </h1>
          <p className="text-ivory/60 max-w-2xl text-lg font-medium">Pilih beragam aktivitas menantang dan menyenangkan untuk melengkapi liburan Anda dengan pengalaman yang tak terlupakan.</p>
        </div>

        <div className="mb-12 pb-12 border-b border-white/5">
          <Dropdown 
            options={sortOptions} 
            value={sortBy} 
            onChange={setSortBy} 
            label="Urutkan"
          />
        </div>

        {activities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((act) => (
              <Card
                key={act.id}
                id={act.id}
                name={act.name}
                location={act.location}
                price={act.price}
                rating={act.rating}
                image={act.image}
                href={`/aktivitas/${act.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex items-center gap-4 p-6 rounded-[32px] bg-lokara-gold/5 border border-lokara-gold/10 backdrop-blur-md">
              <div className="w-10 h-10 border-2 border-lokara-gold border-t-transparent rounded-full animate-spin"></div>
              <div>
                <h3 className="text-sm font-black text-ivory uppercase tracking-widest">Sinkronisasi Backend</h3>
                <p className="text-xs text-ivory/40">Menghubungkan data petualangan eksklusif...</p>
              </div>
            </div>
            <Skeleton />
          </div>
        )}
      </div>
    </div>
  );
}
