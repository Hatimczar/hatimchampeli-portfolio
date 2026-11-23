import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ThemeProvider from "@/components/ThemeProvider";
import SiriGlow from "@/components/SiriGlow";
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

const SITE_URL = "https://hatimchampeli-portfolio.pages.dev";
const SITE_TITLE = "Hatim Champeli - Enterprise IT Solutions & Technology Sales";
const SITE_DESCRIPTION =
  "Hatim Champeli helps UAE businesses choose the right technology and make IT easier to manage, with deep experience in Apple ecosystem deployments, e-commerce operations, and AI-driven marketing, from Dubai.";

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
  alternates: {
    canonical: SITE_URL,
  },
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
  verification: {
    google: "iKIM6-pBaQgmyQtQG5-hLS9BlQr6VQj6fMM3sjWHaTk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <SiriGlow />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
