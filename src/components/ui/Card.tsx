"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

interface CardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  rating?: number;
  image: string;
  href: string;
  badge?: string;
  description?: string;
}

export default function Card({
  name,
  location,
  price,
  rating,
  image,
  href,
  badge,
  description
}: CardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03, rotate: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="group relative glass-dark rounded-3xl overflow-hidden shadow-2xl border border-white/10 transition-all duration-500 flex flex-col h-full"
    >
      <Link href={href} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-lokara-navy-light/50">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-lokara-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {badge && (
            <div className="absolute top-3 left-3 bg-lokara-gold/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider text-lokara-navy shadow-lg">
              {badge}
            </div>
          )}
          
          {rating && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20 shadow-sm">
              <Star className="h-3 w-3 fill-lokara-gold text-lokara-gold" />
              <span className="text-[10px] font-bold text-white">{rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-sm md:text-base text-ivory line-clamp-1 group-hover:text-lokara-gold transition-colors mb-1">
            {name}
          </h3>
          
          <div className="flex items-center text-white/60 text-[10px] md:text-xs mb-3">
            <MapPin className="h-3 w-3 mr-1 shrink-0 text-white/60" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-tighter">Mulai dari</span>
              <span className="font-black text-lokara-gold text-xs md:text-sm">{formatPrice(price)}</span>
            </div>
            <div className="bg-white/5 group-hover:bg-lokara-gold text-white/40 group-hover:text-lokara-navy p-2 rounded-xl transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
