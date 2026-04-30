import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";

const quicksand = Quicksand({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "LOKARA | Perjalanan Jauh Membawa Cerita",
  description: "Booking hotel, tiket wisata, dan berbagai aktivitas berlibur",
  icons: {
    icon: "/lokara_logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${quicksand.className} min-h-screen bg-lokara-navy text-ivory antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
