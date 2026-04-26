import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Check, ArrowLeft, Info } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
}

// Mock data fetching function - to be replaced with real backend call
async function getHotel(): Promise<Hotel | null> {
  // In a real app: return await fetch(`https://api.example.com/hotels/${id}`).then(res => res.json());
  return null; 
}

export default async function HotelDetailPage() {
  const hotel: Hotel | null = await getHotel();

  if (!hotel) {
    return (
      <div className="min-h-screen bg-lokara-navy flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-lokara-gold/10 rounded-full flex items-center justify-center mb-6">
          <Info className="h-10 w-10 text-lokara-gold" />
        </div>
        <h1 className="text-3xl font-black text-ivory mb-4 tracking-tighter">Penawaran Sedang Disiapkan</h1>
        <p className="text-ivory/60 max-w-md mb-8">Kami sedang memperbarui ketersediaan kamar dan fasilitas premium kami. Mohon kembali lagi nanti.</p>
        <Link href="/hotel" className="inline-flex items-center px-8 py-4 bg-lokara-gold text-lokara-navy font-black text-xs uppercase tracking-widest rounded-full transition-all hover:scale-105">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Daftar Hotel
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-lokara-navy text-ivory min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[70vh] min-h-[500px] w-full">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-lokara-navy via-lokara-navy/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
          <div className="max-w-7xl mx-auto">
            <Link href="/hotel" className="inline-flex items-center text-ivory/80 hover:text-lokara-gold mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Daftar Hotel
            </Link>
            <div className="flex gap-3 mb-4">
              <span className="bg-lokara-gold text-lokara-navy text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                Hotel
              </span>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-ivory border border-white/10">
                <Star className="h-3.5 w-3.5 fill-lokara-gold text-lokara-gold" />
                <span className="text-xs font-bold">{hotel.rating}</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-ivory mb-4 tracking-tighter leading-none">
              {hotel.name}
            </h1>
            <div className="flex items-center text-ivory/80">
              <MapPin className="h-5 w-5 mr-2 text-lokara-gold" />
              <span className="text-lg font-medium">{hotel.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-lokara-gold"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-lokara-gold">Tentang Penginapan</h2>
              </div>
              <p className="text-ivory/70 leading-relaxed text-xl font-medium">
                {hotel.description}
              </p>
              <p className="text-ivory/50 leading-relaxed text-lg mt-6">
                Nikmati pengalaman menginap yang tak terlupakan dengan layanan premium dan fasilitas berkualitas tinggi yang disiapkan khusus untuk Anda, memastikan kenyamanan maksimal selama perjalanan Anda di Indonesia.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[2px] bg-lokara-gold"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-lokara-gold">Fasilitas Utama</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {hotel.amenities?.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-4 bg-white/5 p-5 rounded-3xl border border-white/10 backdrop-blur-sm group hover:border-lokara-gold transition-all duration-500">
                    <div className="w-10 h-10 bg-lokara-gold/10 rounded-xl flex items-center justify-center text-lokara-gold group-hover:scale-110 transition-transform">
                      <Check className="h-5 w-5" />
                    </div>
                    <span className="text-ivory/80 font-bold text-sm tracking-wide">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white/5 backdrop-blur-xl rounded-[40px] p-10 border border-white/10 shadow-2xl">
              <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-ivory/40 mb-3">Mulai dari</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-lokara-gold">{formatPrice(hotel.price)}</span>
                  <span className="text-ivory/40 mb-1.5 font-bold">/malam</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <label className="text-[10px] font-black text-ivory/30 uppercase tracking-wider mb-2 block">Check-in</label>
                  <p className="font-bold text-ivory">Pilih Tanggal</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <label className="text-[10px] font-black text-ivory/30 uppercase tracking-wider mb-2 block">Tamu & Kamar</label>
                  <p className="font-bold text-ivory">2 Dewasa, 1 Kamar</p>
                </div>
              </div>

              <button className="w-full bg-lokara-gold hover:bg-ivory text-lokara-navy font-black text-xs uppercase tracking-[0.2em] py-5 rounded-full transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95">
                Pesan Sekarang
              </button>
              
              <p className="text-center text-[10px] font-black uppercase tracking-widest text-ivory/30 mt-6">
                Layanan Exclusive Concierge
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
