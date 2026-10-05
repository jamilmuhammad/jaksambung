import type { Metadata, Viewport } from "next";
import { Archivo_Black, Plus_Jakarta_Sans } from "next/font/google";
import { activeOrigin, siteConfig } from "@/config/site";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(activeOrigin),
  title: {
    default: "JakSambung | Spatial Intelligence for City-Scale Events",
    template: "%s | JakSambung",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "JakSambung | From Crowd Flow to City Flow",
    description: siteConfig.description,
    siteName: "JakSambung",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "JakSambung spatial intelligence network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JakSambung | From Crowd Flow to City Flow",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#101414",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    description: siteConfig.description,
    url: activeOrigin,
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
