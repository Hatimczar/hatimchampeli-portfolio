import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://hatimchampeli.com";
const SITE_TITLE = "Hatim Champeli - Marketing, E-commerce & AI-Driven Growth";
const SITE_DESCRIPTION =
  "Hatim Champeli turns Apple ecosystem complexity, e-commerce operations, and marketing data into measurable growth for premium tech and consumer electronics brands, from Dubai.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s - Hatim Champeli",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Hatim Champeli",
    "Apple ecosystem business development",
    "e-commerce marketplace operations",
    "marketing executive Dubai",
    "JAMF certified",
    "AI-driven marketing",
    "consumer electronics distribution",
  ],
  authors: [{ name: "Hatim Champeli" }],
  creator: "Hatim Champeli",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Hatim Champeli",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
