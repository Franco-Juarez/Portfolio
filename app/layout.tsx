import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import LavaLamp from "./animation/lavaLamp";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Mono } from 'next/font/google';
import { IBM_Plex_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Franco Juarez´s portfolio',
  description: 'My personal front-end developer portfolio',
};


const ibmPlexMono = IBM_Plex_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`${ibmPlexMono.className} ${ibmPlexSans.className} dark:bg-black-theme bg-white-theme antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <LavaLamp />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}


