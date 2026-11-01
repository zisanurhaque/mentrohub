import React from "react";
import Link from "next/link";
import HomepageLayout from "@/components/layout/HomepageLayout";
import Container from "@/components/layout/Container";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <HomepageLayout>
      <Container className="py-20 text-center">
        <div className="max-w-md mx-auto p-8 bg-[#141418] border border-[#252530] rounded-xl space-y-5 shadow-2xl">
          <div className="text-6xl font-black text-[#ff9900] tracking-wider">
            404
          </div>
          <h1 className="text-xl font-bold text-white">
            Knowledge Not Found
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            Even our most hardcore search algorithms couldn&apos;t find this URL.
            It may have vanished into an unprovable mathematical conjecture,
            or been garbage-collected by the browser engine.
          </p>
          <div className="pt-2 flex items-center justify-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs rounded transition-colors"
            >
              <Home size={14} className="mr-1.5" /> Return Home
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center px-4 py-2 bg-[#22222c] hover:bg-[#2c2c36] text-white font-bold text-xs rounded border border-[#333340] transition-colors"
            >
              <Compass size={14} className="mr-1.5 text-[#ff9900]" /> Search Lessons
            </Link>
          </div>
        </div>
      </Container>
    </HomepageLayout>
  );
}
