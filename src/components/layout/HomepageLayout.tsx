import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function HomepageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0e0e11] text-[#f4f4f6]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
