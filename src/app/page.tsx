"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";

interface Destination {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

interface Activity {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

// Data akan di-fetch dari backend nantinya
const hotels: Hotel[] = [];
const destinations: Destination[] = [];
const activities: Activity[] = [];
import { motion, Variants, AnimatePresence } from "framer-motion";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const heroImages = [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2560&auto=format&fit=crop",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="flex flex-col min-h-screen bg-lokara-navy overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 bg-lokara-navy">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 z-10"
            >
              <Image
                src={heroImages[currentImageIndex]}
                alt="Indonesian Travel"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent"></div>
          {/* Subtle animated gradient overlay */}
          <div className="absolute inset-0 opacity-20 bg-linear-to-tr from-lokara-gold/10 via-transparent to-lokara-navy/10 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl md:text-8xl font-black text-ivory tracking-tighter leading-[0.9] mb-8 uppercase drop-shadow-2xl">
              Eksplorasi <br /> Eksklusif <br className="md:hidden" />
              <span className="text-gradient">Pesona Nusantara</span>
            </h1>
            
            <p className="text-sm md:text-xl text-ivory/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md px-4">
              Temukan keajaiban permata tersembunyi Indonesia bersama LOKARA. <br className="hidden md:block" /> 
              Kami menghadirkan pengalaman eksklusif yang dikurasi khusus untuk penjelajah modern.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-lokara-gold/60">Scroll</span>
            <div className="w-px h-12 bg-linear-to-b from-lokara-gold to-transparent"></div>
          </motion.div>
        </div>

        {/* Memudar effect at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-64 bg-linear-to-t from-lokara-navy via-lokara-navy/90 to-transparent z-10"></div>
      </section>

      {/* Main Content Wrapper - Solid background for better readability */}
      <div className="bg-lokara-navy relative z-20 -mt-1">
        <main className="max-w-7xl mx-auto px-6 py-16 md:py-32 space-y-24 md:space-y-40">
          
          {/* Featured Destinations */}
          <section className="relative">
            {/* Subtle background glow for the section */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-lokara-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 md:w-12 h-[2px] bg-lokara-gold"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold">Wonderful Indonesia</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-ivory tracking-tighter leading-none">
                  Destinasi <br className="md:hidden" />
                  <span className="text-gradient">Terpopuler</span>
                </h2>
              </div>
              <Link href="/wisata" className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-lokara-gold border border-white/10 hover:border-lokara-gold rounded-full transition-all duration-500 w-full md:w-auto justify-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-lokara-navy transition-colors">Explore All</span>
                <ArrowRight className="h-4 w-4 text-lokara-gold group-hover:text-lokara-navy group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {destinations.slice(0, 4).map((dest) => (
                <motion.div key={dest.id} variants={itemVariants}>
                  <Card
                    id={dest.id}
                    name={dest.name}
                    location={dest.location}
                    price={dest.price}
                    rating={dest.rating}
                    image={dest.image}
                    badge="Featured"
                    href={`/wisata/${dest.id}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Promotional CTA Section */}
          <section className="relative rounded-[32px] md:rounded-[48px] overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?auto=format&fit=crop&w=2000&q=80" 
                alt="Promo" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-lokara-navy via-lokara-navy/90 md:via-lokara-navy/80 to-transparent"></div>
            </div>
            <div className="relative z-10 px-8 py-20 md:p-24 max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold mb-6 block">Limited Offer</span>
              <h2 className="text-4xl md:text-6xl font-black text-ivory mb-8 leading-[1.1] tracking-tighter">Dapatkan Diskon <br /> Hingga 30% Untuk <br className="hidden md:block" /> <span className="text-gradient">Trip Pertama Anda</span></h2>
              <p className="text-ivory/70 mb-10 text-base md:text-lg max-w-md font-medium leading-relaxed">
                Daftar sekarang dan nikmati pengalaman liburan mewah dengan harga yang lebih terjangkau. Lokara siap menemani perjalanan tak terlupakan Anda.
              </p>
              <button className="w-full md:w-auto px-12 py-5 bg-lokara-gold hover:bg-ivory text-lokara-navy font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-500 shadow-xl hover:scale-105">
                Klaim Sekarang
              </button>
            </div>
          </section>

          {/* Recommended Hotels */}
          <section className="relative">
            {/* Subtle background glow for the section */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-lokara-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 md:w-12 h-[2px] bg-lokara-gold"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold">Premium Accommodation</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-ivory tracking-tighter leading-none">
                  Luxury <br className="md:hidden" />
                  <span className="text-gradient">Stays</span>
                </h2>
              </div>
              <Link href="/hotel" className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-lokara-gold border border-white/10 hover:border-lokara-gold rounded-full transition-all duration-500 w-full md:w-auto justify-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-lokara-navy transition-colors">Book Now</span>
                <ArrowRight className="h-4 w-4 text-lokara-gold group-hover:text-lokara-navy group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {hotels.slice(0, 4).map((hotel) => (
                <motion.div key={hotel.id} variants={itemVariants}>
                  <Card
                    id={hotel.id}
                    name={hotel.name}
                    location={hotel.location}
                    price={hotel.price}
                    rating={hotel.rating}
                    image={hotel.image}
                    badge="Luxury"
                    href={`/hotel/${hotel.id}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Activities */}
          <section className="relative pb-16 md:pb-24">
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-lokara-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 md:w-12 h-[2px] bg-lokara-gold"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lokara-gold">Curated Experience</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-ivory tracking-tighter leading-none">
                  Aktivitas <br className="md:hidden" />
                  <span className="text-gradient">Seru</span>
                </h2>
              </div>
              <Link href="/aktivitas" className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-lokara-gold border border-white/10 hover:border-lokara-gold rounded-full transition-all duration-500 w-full md:w-auto justify-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-lokara-navy transition-colors">See All</span>
                <ArrowRight className="h-4 w-4 text-lokara-gold group-hover:text-lokara-navy group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {activities.slice(0, 4).map((activity) => (
                <motion.div key={activity.id} variants={itemVariants}>
                  <Card
                    id={activity.id}
                    name={activity.name}
                    location={activity.location}
                    price={activity.price}
                    rating={activity.rating}
                    image={activity.image}
                    badge="Adventure"
                    href={`/aktivitas/${activity.id}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}
