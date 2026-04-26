"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfoModal from "@/components/ui/InfoModal";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const INFO_CONTENT = {
  "pusat-bantuan": {
    title: "Pusat Bantuan",
    content: `Selamat datang di Pusat Bantuan LOKARA. Tim kami siap membantu Anda mendapatkan pengalaman terbaik dalam merencanakan liburan impian Anda.

Layanan Pelanggan kami tersedia 24/7 melalui:
- WhatsApp: +62 812 3456 7890
- Email: support@lokara.id
- Live Chat: Tersedia di pojok kanan bawah website

Kami dapat membantu Anda dengan pertanyaan seputar booking hotel, tiket wisata, hingga pembatalan dan refund.`
  },
  "syarat-ketentuan": {
    title: "Syarat & Ketentuan",
    content: `Dengan menggunakan layanan LOKARA, Anda menyetujui syarat dan ketentuan berikut:

1. Penggunaan Layanan: Anda setuju untuk menggunakan platform kami hanya untuk tujuan yang sah.
2. Akurasi Informasi: Kami berusaha memberikan informasi seakurat mungkin, namun harga dan ketersediaan dapat berubah sewaktu-waktu.
3. Kebijakan Pembatalan: Setiap destinasi dan hotel memiliki kebijakan pembatalan yang berbeda-beda. Harap periksa detail pada saat pemesanan.
4. Tanggung Jawab: LOKARA tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan layanan kami.

Syarat dan ketentuan ini dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.`
  },
  "kebijakan-privasi": {
    title: "Kebijakan Privasi",
    content: `LOKARA sangat menghargai privasi Anda. Berikut adalah ringkasan kebijakan kami:

1. Data yang Kami Kumpulkan: Nama, email, nomor telepon, dan data transaksi saat Anda melakukan pemesanan.
2. Penggunaan Data: Kami menggunakan data Anda untuk memproses pemesanan, memberikan dukungan pelanggan, dan mengirimkan promo yang relevan.
3. Keamanan: Kami menggunakan teknologi enkripsi standar industri untuk melindungi data pribadi Anda.
4. Pihak Ketiga: Kami hanya membagikan data Anda kepada mitra (hotel/vendor wisata) yang diperlukan untuk menyelesaikan pesanan Anda.

Kami tidak akan pernah menjual data pribadi Anda kepada pihak mana pun.`
  },
  "faq": {
    title: "FAQ",
    content: `Pertanyaan yang Sering Diajukan:

Q: Bagaimana cara memesan tiket wisata?
A: Cari destinasi impian Anda, klik tombol 'Pesan', dan ikuti instruksi pembayaran.

Q: Apakah saya bisa mengubah tanggal booking hotel?
A: Perubahan tanggal tergantung pada kebijakan masing-masing hotel. Silakan hubungi Pusat Bantuan kami.

Q: Metode pembayaran apa saja yang didukung?
A: Kami mendukung Transfer Bank, Kartu Kredit, E-Wallet (OVO, GoPay, Dana), dan Virtual Account.

Q: Bagaimana jika saya ingin refund?
A: Proses refund dapat diajukan melalui Pusat Bantuan dengan menyertakan bukti pemesanan.`
  }
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState<keyof typeof INFO_CONTENT | null>(null);

  return (
    <footer className="bg-lokara-navy text-ivory border-t border-lokara-gold/10 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shadow-xl group-hover:border-lokara-gold/50 transition-all duration-500">
                <Image src="/lokara_logo.webp" alt="LOKARA Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-2xl tracking-tighter uppercase text-lokara-gold">
                  LOKARA
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
                  Indonesia
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Platform pariwisata terpercaya untuk pengalaman liburan yang elegan dan tak terlupakan di seluruh Indonesia.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: InstagramIcon, href: "#", label: "Instagram" },
                { Icon: FacebookIcon, href: "#", label: "Facebook" },
                { Icon: XIcon, href: "#", label: "X" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-lokara-gold/60 hover:text-lokara-gold hover:bg-lokara-gold/10 hover:border-lokara-gold/30 transition-all duration-300"
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lokara-gold uppercase text-[10px] tracking-[0.2em] mb-6">Perusahaan</h3>
            <ul className="space-y-4">
              <li><Link href="/tentang" className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors">Tentang Kami</Link></li>
              <li><Link href="/karir" className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors">Karir</Link></li>
              <li><Link href="/blog" className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors">Blog</Link></li>
              <li><Link href="/kontak" className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lokara-gold uppercase text-[10px] tracking-[0.2em] mb-6">Layanan</h3>
            <ul className="space-y-4">
              <li><Link href="/hotel" className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors">Booking Hotel</Link></li>
              <li><Link href="/wisata" className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors">Tiket Wisata</Link></li>
              <li><Link href="/aktivitas" className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors">Paket Aktivitas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lokara-gold uppercase text-[10px] tracking-[0.2em] mb-6">Bantuan</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => setActiveModal("pusat-bantuan")}
                  className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors text-left"
                >
                  Pusat Bantuan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal("syarat-ketentuan")}
                  className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors text-left"
                >
                  Syarat & Ketentuan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal("kebijakan-privasi")}
                  className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors text-left"
                >
                  Kebijakan Privasi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveModal("faq")}
                  className="text-sm text-ivory/40 hover:text-lokara-gold transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-lokara-gold/10 mt-12 pt-8 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} LOKARA. All rights reserved.
          </p>
        </div>
      </div>

      {/* Info Modals */}
      <InfoModal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)}
        title={activeModal ? INFO_CONTENT[activeModal].title : ""}
        content={activeModal ? INFO_CONTENT[activeModal].content : ""}
      />
    </footer>
  );
}
