import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/app/providers";
import { PlatformShell } from "@/components/platform-shell";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.geloofsgebonden.nl"),
  title: {
    default: "Geloofsgebonden - Anonieme Christelijke Community | Gebed & Dankzegging",
    template: "%s | Geloofsgebonden",
  },
  description: "Geloofsgebonden is hét platform voor 'geloofsgebonden' mensen. Deel anoniem je gebed, dankbaarheid en vragen. De grootste christelijke community van Nederland en België.",
  keywords: [
    "geloofsgebonden", 
    "geloofs gebonden", 
    "christelijk platform", 
    "anoniem bidden", 
    "gebed", 
    "dankzegging",
    "bijbel", 
    "community", 
    "vroomheid", 
    "christelijke vragen", 
    "gebedspunten",
    "christelijk forum",
    "geloofsgesprek"
  ],
  authors: [{ name: "Geloofsgebonden Team" }],
  creator: "Geloofsgebonden",
  publisher: "Geloofsgebonden",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://www.geloofsgebonden.nl",
    siteName: "Geloofsgebonden",
    title: "Geloofsgebonden - De christelijke community voor gebed en verbinding",
    description: "Anoniem christelijk community platform voor gebed, dank en vragen. Groei samen in je geloof.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Geloofsgebonden Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geloofsgebonden - De christelijke community",
    description: "Anoniem christelijk community platform voor gebed, dank en vragen.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Geloofsgebonden",
    "url": "https://www.geloofsgebonden.nl",
    "description": "Hét anonieme christelijke platform voor gebed, dankzegging en verbinding. Groei samen in geloof.",
    "publisher": {
      "@type": "Organization",
      "name": "Geloofsgebonden",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.geloofsgebonden.nl/favicon.ico"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.geloofsgebonden.nl/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <PlatformShell>{children}</PlatformShell>
          </div>
        </Providers>
      </body>
    </html>
  );
}
