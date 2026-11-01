import React from "react";
import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] text-xs text-gray-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Disclaimer Paragraph (Exact Match to Screenshot 1) */}
        <p className="text-[#888888] text-[11px] sm:text-xs max-w-4xl mx-auto text-center leading-relaxed">
          MentroHub provides you with unlimited free educational videos with the hottest professors.
          Enjoy the largest amateur intellectual community on the net as well as full-length lectures
          from the top Ivy League studios. We update our educational videos daily to ensure you always
          get the best quality brain food.
        </p>

        {/* 4 Footer Columns with Orange Links (Exact Match to Screenshot 1) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto pt-2">
          {/* Col 1: Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#e0e0e0]">Information</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/sitemap.xml" className="text-[#ff9900] hover:underline">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#ff9900] hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#ff9900] hover:underline">
                  Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-[#ff9900] hover:underline">
                  DMCA Fair Use
                </Link>
              </li>
              <li>
                <Link href="/2257" className="text-[#ff9900] hover:underline">
                  2257 Educational Exemption
                </Link>
              </li>
              <li>
                <span className="text-[#ff9900] hover:underline cursor-pointer">
                  EU DSA
                </span>
              </li>
              <li>
                <span className="text-[#ff9900] hover:underline cursor-pointer">
                  Recommender System Guidelines
                </span>
              </li>
              <li>
                <span className="text-[#ff9900] hover:underline cursor-pointer">
                  Cookie Notice
                </span>
              </li>
              <li>
                <span className="text-[#ff9900] hover:underline cursor-pointer">
                  Accessibility
                </span>
              </li>
              <li>
                <span className="text-[#ff9900] hover:underline cursor-pointer">
                  Notice to Law Enforcement
                </span>
              </li>
            </ul>
          </div>

          {/* Col 2: Work With Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#e0e0e0]">Work With Us</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/partners" className="text-[#ff9900] hover:underline">
                  Content Partners
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-[#ff9900] hover:underline">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/webmasters" className="text-[#ff9900] hover:underline">
                  Webmasters
                </Link>
              </li>
              <li>
                <Link href="/educator-program" className="text-[#ff9900] hover:underline">
                  Professor & Educator Program
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-[#ff9900] hover:underline">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support and Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#e0e0e0]">Support and Help</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/support" className="text-[#ff9900] hover:underline">
                  Content Removal
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#ff9900] hover:underline">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#ff9900] hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/trust-safety" className="text-[#ff9900] hover:underline">
                  Trust and Academic Safety
                </Link>
              </li>
              <li>
                <Link href="/parental-controls" className="text-[#ff9900] hover:underline">
                  Parental Controls
                </Link>
              </li>
              <li>
                <span className="text-[#ff9900] hover:underline cursor-pointer">
                  Manage Cookies
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Discover */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#e0e0e0]">Discover</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog" className="text-[#ff9900] hover:underline">
                  MentroHub Blog
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-[#ff9900] hover:underline">
                  Insights Blog
                </Link>
              </li>
              <li>
                <Link href="/wellness" className="text-[#ff9900] hover:underline">
                  Intellectual Wellness Center
                </Link>
              </li>
              <li>
                <Link href="/mobile" className="text-[#ff9900] hover:underline">
                  Mobile
                </Link>
              </li>
              <li>
                <Link href="/a11y/visual" className="text-[#ff9900] hover:underline">
                  Visually Impaired
                </Link>
              </li>
              <li>
                <Link href="/a11y/audio" className="text-[#ff9900] hover:underline">
                  Audio Impaired
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Language Selector Row (Exact Match to Screenshot 1) */}
        <div className="max-w-5xl mx-auto flex items-center space-x-2 text-xs pt-4">
          <span className="text-gray-400 font-semibold">Language:</span>
          <button
            type="button"
            className="flex items-center space-x-1.5 bg-[#1f1f1f] hover:bg-[#282828] text-white px-3 py-1.5 rounded-sm border border-[#2b2b2b] transition-colors"
          >
            <Globe size={13} className="text-gray-400" />
            <span className="font-bold text-xs">English</span>
            <ChevronDown size={12} className="text-gray-400 ml-1" />
          </button>
        </div>

        {/* Bottom Bar: Social Icons, Copyright, RTE Badge & Notice to Users */}
        <div className="max-w-5xl mx-auto pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social Icons (X and Discord) */}
          <div className="flex items-center space-x-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#1e1e1e] hover:bg-[#ff9900] hover:text-black text-gray-300 flex items-center justify-center font-bold text-xs transition-colors"
              title="X / Twitter"
            >
              𝕏
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#1e1e1e] hover:bg-[#ff9900] hover:text-black text-gray-300 flex items-center justify-center font-bold text-xs transition-colors"
              title="Discord"
            >
              💬
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right text-[#777777] text-xs">
            © MentroHub.com, 2026
          </div>

          {/* Badges & Notice to Users button (Exact Match to Screenshot 1) */}
          <div className="flex items-center space-x-4">
            {/* Parody RTA Badge */}
            <div className="border border-white/20 px-2 py-0.5 rounded-sm font-black text-xs text-white tracking-widest bg-black">
              RTE®
            </div>

            {/* Notice to Users Button */}
            <Link
              href="/notice"
              className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs px-4 py-2 rounded-sm transition-colors text-center"
            >
              Notice to Users
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
