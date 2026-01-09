import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Pauta | Monitoramento regulatório",
  description: "MVP para monitorar pautas de agências regulatórias brasileiras"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen">
        <div className="min-h-screen gradient-bg">
          {children}
        </div>
      </body>
    </html>
  );
}
