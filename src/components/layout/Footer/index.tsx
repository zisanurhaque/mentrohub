"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  ChevronDown,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Mail,
  Send,
  ExternalLink,
} from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";
import EducationalAd from "@/components/ads/EducationalAd";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "ja", name: "日本語" },
];

export default function Footer() {
  const [selectedLang, setSelectedLang] = useState("English");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    if (langDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [langDropdownOpen]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterSubscribed(false);
    }, 4000);
  };

  return (
    <>
      {/* Subtle Pre-Footer Educational Ad Placement */}
      <EducationalAd variant="footer" />

      {/* Humorous Educational Quote Strip */}
      <div className="bg-[#0b0b0e] border-t border-[#18181f] py-3 text-center px-4">
        <p className="text-[11px] sm:text-xs text-[#a0a0aa] font-normal flex items-center justify-center space-x-2">
          <Sparkles size={13} className="text-[#ff9900]" />
          <span>Less scrolling through nonsense. More scrolling through knowledge.</span>
          <span className="hidden md:inline text-gray-500">•</span>
          <span className="hidden md:inline text-gray-300 font-medium">
            We take learning seriously. Ourselves? Not so much.
          </span>
        </p>
      </div>

      {/* Main Footer Container: Unified subtle elevated panel */}
      <footer className="bg-[#0c0c10] border-t border-[#1c1c24] text-xs text-gray-400 pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Top Disclaimer Paragraph */}
          <p className="text-[#808088] text-[11px] sm:text-xs max-w-4xl mx-auto text-center leading-relaxed font-normal">
            MentroHub provides you with unlimited free educational videos with the hottest professors.
            Enjoy the largest amateur intellectual community on the net as well as full-length lectures
            from the top Ivy League studios. We update our educational videos daily to ensure you always
            get the best quality brain food.
          </p>

          {/* Main Footer Grid: 4 Columns with consistent visual hierarchy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pt-2 border-t border-[#181820]">
            {/* Col 1: Brand Wordmark, Description & Social Icons (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-4">
              <BrandLogo size="md" showTagline />

              <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-sm">
                The internet&apos;s premier educational entertainment platform.
                Legitimate, world-class university lectures packaged in the web&apos;s most recognizable
                and engaging streaming layout. 100% free, consensual, and safe for work.
              </p>

              {/* Social Icons & Language Pill */}
              <div className="flex items-center space-x-3 pt-1">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#181820] hover:bg-[#ff9900] hover:text-black text-gray-300 flex items-center justify-center font-bold text-xs transition-colors border border-[#24242e]"
                  title="X / Twitter"
                  aria-label="Twitter"
                >
                  𝕏
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#181820] hover:bg-[#ff9900] hover:text-black text-gray-300 flex items-center justify-center font-bold text-xs transition-colors border border-[#24242e]"
                  title="Discord"
                  aria-label="Discord"
                >
                  💬
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#181820] hover:bg-[#ff9900] hover:text-black text-gray-300 flex items-center justify-center text-xs transition-colors border border-[#24242e]"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <ExternalLink size={13} />
                </a>

                {/* Language Selector */}
                <div className="relative ml-2" ref={langRef}>
                  <button
                    type="button"
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    className="flex items-center space-x-1.5 bg-[#16161c] hover:bg-[#202028] text-white px-3 py-1.5 rounded-sm border border-[#24242e] transition-colors text-xs font-medium"
                  >
                    <Globe size={13} className="text-gray-400" />
                    <span>{selectedLang}</span>
                    <ChevronDown size={11} className="text-gray-400 ml-0.5" />
                  </button>

                  {langDropdownOpen && (
                    <div className="absolute left-0 bottom-full mb-1 w-36 bg-[#16161c] border border-[#282834] rounded-sm shadow-2xl py-1 z-50">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setSelectedLang(lang.name);
                            setLangDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 text-xs text-gray-300 hover:bg-[#ff9900] hover:text-black flex items-center justify-between transition-colors font-medium"
                        >
                          <span>{lang.name}</span>
                          {selectedLang === lang.name && <Check size={12} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Col 2: Educational Disciplines (2 cols on lg) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
                Disciplines
              </h4>
              <ul className="space-y-2 text-xs font-normal">
                <li>
                  <Link href="/categories/programming" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    Programming & Code
                  </Link>
                </li>
                <li>
                  <Link href="/categories/mathematics" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    Higher Mathematics
                  </Link>
                </li>
                <li>
                  <Link href="/categories/artificial-intelligence" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    Artificial Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/categories/science" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    Physics & Science
                  </Link>
                </li>
                <li>
                  <Link href="/categories/business-finance" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    Finance & Economics
                  </Link>
                </li>
                <li>
                  <Link href="/categories/productivity-tools" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    Productivity & Excel
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Resources & Trust (2 cols on lg) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
                Platform
              </h4>
              <ul className="space-y-2 text-xs font-normal">
                <li>
                  <Link href="/collections" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    Curated Tracks
                  </Link>
                </li>
                <li>
                  <Link href="/search?q=Grant+Sanderson" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    Top Professors
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard?tab=saved" className="text-gray-400 hover:text-[#ff9900] transition-colors">
                    Study Notes & Saved
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-gray-400 hover:text-[#ff9900] transition-colors text-left"
                  >
                    Trust & Safety
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-gray-400 hover:text-[#ff9900] transition-colors text-left"
                  >
                    Terms of Learning
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-gray-400 hover:text-[#ff9900] transition-colors text-left"
                  >
                    Privacy Notice
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Newsletter Subscription Card (4 cols on lg) */}
            <div className="lg:col-span-4">
              <div className="bg-[#121217] border border-[#22222c] rounded-md p-4 sm:p-5 space-y-3 shadow-md">
                <div className="flex items-center space-x-2 text-white font-semibold text-sm">
                  <Mail size={16} className="text-[#ff9900]" />
                  <span>Stay Smarter Than Your Algorithm</span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-normal">
                  Get a curated weekly digest of top educational lectures, cheat sheets, and brain food. Zero spam.
                </p>

                {newsletterSubscribed ? (
                  <div className="p-2.5 rounded bg-[#ff9900]/15 border border-[#ff9900]/40 text-[#ff9900] text-xs font-medium flex items-center space-x-2 animate-in fade-in duration-200">
                    <Check size={14} className="text-[#ff9900]" />
                    <span>Welcome to the intellectual elite! Check your inbox soon.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="your.intellect@university.edu"
                        className="w-full bg-[#181820] text-xs text-white placeholder-gray-500 px-3 py-2 rounded-sm border border-[#2c2c38] focus:outline-none focus:border-[#ff9900] transition-colors"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-2 bg-[#ff9900] hover:bg-[#e68a00] text-black font-semibold text-xs rounded-sm transition-colors uppercase tracking-wider shrink-0 flex items-center justify-center space-x-1 shadow-sm"
                      >
                        <Send size={12} className="mr-1" />
                        <span>Subscribe</span>
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-500 block">
                      100% Free • Unsubscribe with one click anytime.
                    </span>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Creator credit & Legal Badges */}
          <div className="pt-6 border-t border-[#181820] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#70707a]">
            {/* Copyright */}
            <div className="text-center sm:text-left font-normal">
              © MentroHub.com, 2026. Unlimited Knowledge. Zero Regrets.
            </div>

            {/* Creator / Open Education Credit */}
            <div className="text-center text-[11px] text-gray-400 font-normal">
              Curated for curious lifelong learners worldwide
            </div>

            {/* RTE Badge & Notice Modal Button */}
            <div className="flex items-center space-x-3">
              <div
                className="border border-white/20 px-2 py-0.5 rounded-sm font-bold text-xs text-white tracking-widest bg-black cursor-help"
                title="Restricted To Education (RTE) — 100% SFW Educational Material Only"
              >
                RTE®
              </div>

              <button
                type="button"
                onClick={() => setNoticeModalOpen(true)}
                className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-semibold text-xs px-3.5 py-1.5 rounded-sm transition-colors text-center uppercase tracking-wider shadow-sm"
              >
                Notice to Users
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Notice to Users Interactive Modal */}
      {noticeModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#141418] border border-[#2b2b38] rounded-md max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setNoticeModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
            >
              <X size={18} />
            </button>

            <div className="flex items-center space-x-2 text-[#ff9900] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Official MentroHub Educational Statement</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Notice to Lifelong Learners & Visitors
            </h3>

            <div className="space-y-3 text-xs text-gray-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1 font-normal">
              <p>
                <strong>MentroHub is a legitimate educational entertainment platform.</strong> It humorously adapts the layout, visual hierarchy, and recognizable aesthetics of popular video-sharing sites for 100% clean, safe-for-work, and world-class educational lectures.
              </p>
              <p>
                All video streams embedded on this platform originate from official, publicly accessible YouTube channels belonging to esteemed educators, institutions, and foundations—including Harvard CS50, 3Blue1Brown, freeCodeCamp, Veritasium, and Andrej Karpathy.
              </p>
              <p>
                We do not host proprietary copyright videos directly or bypass YouTube terms. The platform exists to make learning addictive, fun, and memorable.
              </p>
              <div className="p-3 bg-[#1a1a24] rounded-sm border border-[#2a2a3a] text-gray-200">
                <span className="text-[#ff9900] font-semibold">RTE® Certification:</span> Restricted To Education. Guaranteed 0% illicit content, 100% intellectual enrichment.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setNoticeModalOpen(false)}
                className="px-5 py-2 bg-[#ff9900] hover:bg-[#e68a00] text-black font-semibold text-xs rounded-sm transition-colors uppercase tracking-wider"
              >
                I Understand & Consent To Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
