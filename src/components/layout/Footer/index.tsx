import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, BookOpen, GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b0b0d] border-t border-[#1f1f26] text-gray-400 text-xs">
      {/* Top Banner Notice */}
      <div className="bg-[#121217] border-b border-[#1b1b22] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 font-medium flex items-center justify-center flex-wrap gap-1.5">
            <Sparkles size={14} className="text-[#ff9900]" />
            <span className="font-bold text-white">Your Search History Is About To Get Smarter.</span>
            <span>Over 25,000,000 minutes of pure, consensual mathematics, coding, and science explained.</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3 pr-4">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-black text-white">Mentro</span>
              <span className="bg-[#ff9900] text-black font-black text-base px-2 py-0.5 rounded ml-1 tracking-wider uppercase">
                HUB
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              MentroHub is the world&apos;s premier educational entertainment platform.
              Combining the visual familiarity of the web&apos;s most addictive layouts
              with completely legitimate, world-class educational lectures from 3Blue1Brown,
              freeCodeCamp, Harvard CS50, and Veritasium.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-[#ff9900] font-semibold bg-[#16161c] p-2 rounded border border-[#23232c] w-fit">
              <ShieldCheck size={14} />
              <span>100% Pure Knowledge • SFW Certified • Zero Regrets</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22222b] pb-1.5 flex items-center">
              <BookOpen size={13} className="mr-1 text-[#ff9900]" />
              Hot Categories
            </h4>
            <ul className="space-y-1.5 pt-1">
              <li>
                <Link href="/categories/programming" className="hover:text-[#ff9900] transition-colors">
                  Hardcore Coding
                </Link>
              </li>
              <li>
                <Link href="/categories/artificial-intelligence" className="hover:text-[#ff9900] transition-colors">
                  AI & Neural Nets
                </Link>
              </li>
              <li>
                <Link href="/categories/mathematics" className="hover:text-[#ff9900] transition-colors">
                  Sensual Calculus
                </Link>
              </li>
              <li>
                <Link href="/categories/finance" className="hover:text-[#ff9900] transition-colors">
                  High Finance 101
                </Link>
              </li>
              <li>
                <Link href="/categories/productivity" className="hover:text-[#ff9900] transition-colors">
                  Spreadsheet Wizardry
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22222b] pb-1.5 flex items-center">
              <GraduationCap size={13} className="mr-1 text-[#ff9900]" />
              Collections
            </h4>
            <ul className="space-y-1.5 pt-1">
              <li>
                <Link href="/collections/learn-python-from-scratch" className="hover:text-[#ff9900] transition-colors">
                  Python From Scratch
                </Link>
              </li>
              <li>
                <Link href="/collections/full-stack-web-mastery" className="hover:text-[#ff9900] transition-colors">
                  Full-Stack Mastery
                </Link>
              </li>
              <li>
                <Link href="/collections/mathematics-made-simple" className="hover:text-[#ff9900] transition-colors">
                  Visual Mathematics
                </Link>
              </li>
              <li>
                <Link href="/collections/introduction-to-artificial-intelligence" className="hover:text-[#ff9900] transition-colors">
                  Bare Metal GPTs
                </Link>
              </li>
              <li>
                <Link href="/collections/understanding-personal-finance" className="hover:text-[#ff9900] transition-colors">
                  Financial Freedom
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Humor Notice */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#22222b] pb-1.5">
              Legal & Disclaimers
            </h4>
            <ul className="space-y-1.5 pt-1 text-[11px]">
              <li>
                <span className="text-gray-300">Terms of Learning</span>
              </li>
              <li>
                <span className="text-gray-300">Privacy & Cookie History</span>
              </li>
              <li>
                <span className="text-gray-300">Section 2257 (Brain Food Only)</span>
              </li>
              <li>
                <span className="text-gray-300">DMCA & Fair Use YouTube Embeds</span>
              </li>
              <li>
                <Link href="/dashboard" className="text-[#ff9900] hover:underline">
                  My Learning Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#1a1a20] flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-3">
          <p>© 2025 MentroHub LLC. Unlimited Knowledge. Zero Regrets.</p>
          <p className="flex items-center">
            Made with <Heart size={11} className="mx-1 text-[#ff9900] fill-[#ff9900]" /> for consenting lifelong learners worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
