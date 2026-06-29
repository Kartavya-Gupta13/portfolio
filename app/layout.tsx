import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kartavyagupta.com"),
  title: "Kartavya Gupta — Content Strategist",
  description:
    "Content strategist who actually executes. Research, ideation, scripting, editing, distribution — full lifecycle across YouTube, Instagram, TikTok, X & LinkedIn.",
  openGraph: {
    title: "Kartavya Gupta — Content Strategist",
    description: "A strategist who can actually execute.",
    url: "https://www.kartavyagupta.com",
    siteName: "Kartavya Gupta",
    type: "website",
    images: [
      {
        url: "/og/og.jpg",
        width: 2400,
        height: 1260,
        alt: "Kartavya Gupta — Content Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kartavya Gupta — Content Strategist",
    description: "A strategist who can actually execute.",
    images: ["/og/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${instrument.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
