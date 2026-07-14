import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Nour Amri Deco",
    template: "%s | Nour Amri Deco",
  },
  description: "Atelier tunisien de decoration en platre: plafonds, corniches, moulures et staff decoratif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${body.variable}`}>
        <div className="min-h-screen bg-[var(--paper)] text-[var(--ink-900)]">
          <div className="pointer-events-none fixed inset-0 -z-10 opacity-50 [background:radial-gradient(circle_at_20%_20%,rgba(195,151,93,0.25),transparent_45%),radial-gradient(circle_at_80%_8%,rgba(167,92,62,0.18),transparent_36%),radial-gradient(circle_at_80%_80%,rgba(111,79,40,0.1),transparent_40%)]" />
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
