import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MentroHub — The Internet's Most Educational Destination",
  description:
    "Unlimited Knowledge. Zero Regrets. Discover thousands of verified educational lectures, explainers, and courses in mathematics, coding, AI, and science.",
  keywords: [
    "education",
    "programming",
    "mathematics",
    "calculus",
    "freecodecamp",
    "3blue1brown",
    "cs50",
    "machine learning",
    "python",
    "edtech",
  ],
  authors: [{ name: "MentroHub Educational Entertainment" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "MentroHub — The Internet's Most Educational Destination",
    description: "Unlimited Knowledge. Zero Regrets. Come for the curiosity, stay for the knowledge.",
    siteName: "MentroHub",
    type: "website",
    locale: "en_US",
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
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#0a0a0c] text-[#f4f4f6] min-h-screen selection:bg-[#ff9900] selection:text-black`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
