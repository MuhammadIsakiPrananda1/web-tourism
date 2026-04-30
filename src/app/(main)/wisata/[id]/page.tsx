import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowLeft, Clock, Info } from "lucide-react";
import QuantitySelector from "@/components/ui/QuantitySelector";

interface Destination {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
}

// Mock data fetching function - to be replaced with real backend call
async function getDestination(): Promise<Destination | null> {
  // In a real app: return await fetch(`https://api.example.com/destinations/${id}`).then(res => res.json());
  return null; 
}

export default async function WisataDetailPage() {
  const dest: Destination | null = await getDestination();

  if (!dest) {
    // For now, if no data is found (since we removed dummy), show coming soon or not found
    return (
      <div className="min-h-screen bg-lokara-navy flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-lokara-gold/10 rounded-full flex items-center justify-center mb-6">
          <Info className="h-10 w-10 text-lokara-gold" />
        </div>
        <h1 className="text-3xl font-black text-ivory mb-4 tracking-tighter">Halaman Sedang Disiapkan</h1>
        <p className="text-ivory/60 max-w-md mb-8">Kami sedang menghubungkan detail destinasi ini dengan sistem backend terbaru kami. Mohon kembali lagi nanti.</p>
        <Link href="/wisata" className="inline-flex items-center px-8 py-4 bg-lokara-gold text-lokara-navy font-black text-xs uppercase tracking-widest rounded-full transition-all hover:scale-105">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Destinasi
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
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] w-full">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-lokara-navy via-lokara-navy/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
          <div className="max-w-7xl mx-auto">
            <Link href="/wisata" className="inline-flex items-center text-ivory/80 hover:text-lokara-gold mb-6 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Destinasi
            </Link>
            <div className="flex gap-3 mb-4">
              <span className="bg-lokara-gold text-lokara-navy text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                Wisata Alam
              </span>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-ivory border border-white/10">
                <Star className="h-3.5 w-3.5 fill-lokara-gold text-lokara-gold" />
                <span className="text-xs font-bold">{dest.rating}</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-ivory mb-4 tracking-tighter leading-none">
              {dest.name}
            </h1>
            <div className="flex items-center text-ivory/80">
              <MapPin className="h-5 w-5 mr-2 text-lokara-gold" />
              <span className="text-lg font-medium">{dest.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          <div className="lg:col-span-2 space-y-16">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[2px] bg-lokara-gold"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-lokara-gold">Tentang Destinasi</h2>
              </div>
              <p className="text-ivory/70 leading-relaxed text-xl font-medium">
                {dest.description}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[2px] bg-lokara-gold"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-lokara-gold">Informasi Penting</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-5 p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-lokara-gold/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="text-lokara-gold h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ivory text-lg mb-1">Jam Operasional</h4>
                    <p className="text-sm text-ivory/50">Setiap Hari: 08.00 - 17.00 WIB</p>
                  </div>
                </div>
                <div className="flex items-start gap-5 p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-lokara-gold/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Info className="text-lokara-gold h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ivory text-lg mb-1">Tips Berkunjung</h4>
                    <p className="text-sm text-ivory/50">Gunakan pakaian yang nyaman dan bawa kamera terbaik Anda.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white/5 backdrop-blur-xl rounded-[40px] p-10 border border-white/10 shadow-2xl">
              <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-ivory/40 mb-3">Harga Tiket Masuk</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-lokara-gold">{formatPrice(dest.price)}</span>
                  <span className="text-ivory/40 mb-1.5 font-bold">/orang</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 group focus-within:border-lokara-gold transition-colors">
                  <label className="text-[10px] font-black text-ivory/30 uppercase tracking-wider mb-2 block">Tanggal Kunjungan</label>
                  <input type="date" title="Tanggal Kunjungan" aria-label="Tanggal Kunjungan" className="bg-transparent w-full font-bold text-ivory outline-none scheme-dark" />
                </div>
                <QuantitySelector label="Jumlah Tiket" />
              </div>

              <button className="w-full bg-lokara-gold hover:bg-ivory text-lokara-navy font-black text-xs uppercase tracking-[0.2em] py-5 rounded-full transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95">
                Pesan Tiket Sekarang
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
