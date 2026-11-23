import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASTROVERSE | AI-Powered Vedic Astrology & Spiritual Guidance",
  description:
    "Explore authentic Vedic Janam Kundli, high-precision astronomical ephemeris, AI Astrologer conversations, Ashtakoota 36 Gunas compatibility, and daily Panchang.",
  keywords: [
    "Vedic Astrology",
    "Janam Kundli",
    "AI Astrologer",
    "Horoscope",
    "Kundli Milan",
    "Panchang",
    "Vimshottari Dasha",
    "Numerology",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-cosmic-950 text-slate-100 min-h-screen flex flex-col selection:bg-amber-400 selection:text-cosmic-950">
        <AuthProvider>
          <Starfield />
          <Navbar />
          <main className="flex-grow relative z-10">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
