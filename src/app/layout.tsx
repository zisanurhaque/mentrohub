import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MentroHub — The Internet's Most Educational Destination",
  description: "Unlimited Knowledge. Zero Regrets. Discover world-class educational lectures, explainers, and courses in mathematics, coding, AI, and science.",
  keywords: ["education", "programming", "mathematics", "calculus", "freecodecamp", "3blue1brown", "cs50", "machine learning"],
  authors: [{ name: "MentroHub Educational Entertainment" }],
  openGraph: {
    title: "MentroHub — The Internet's Most Educational Destination",
    description: "Unlimited Knowledge. Zero Regrets. Come for the curiosity, stay for the knowledge.",
    siteName: "MentroHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MentroHub — The Internet's Most Educational Destination",
    description: "Your search history is about to get smarter.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0e0e11] text-[#f4f4f6] min-h-screen`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
