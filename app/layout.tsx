import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorGlow } from "@/components/cursor-glow";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bush to Bay | Luxury Coach Hire — Gauteng to Anywhere in Southern Africa",
    template: "%s | Bush to Bay Travel and Tours",
  },
  description:
    "Luxury coach and bus hire from Gauteng to anywhere in Southern Africa. Church groups, school trips, tours and corporate events. Your journey. Our wheels. Let's go!",
  keywords: [
    "coach hire",
    "bus hire Gauteng",
    "luxury coach South Africa",
    "group transport",
    "Bush to Bay",
  ],
  openGraph: {
    title: "Bush to Bay Travel and Tours",
    description: "Luxury coach hire from Gauteng to anywhere in Southern Africa.",
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${sans.variable} noise font-sans`}>
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <ScrollProgress />
          <CursorGlow />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
