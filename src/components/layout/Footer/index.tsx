"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Globe, ChevronDown, Check, X, Sparkles, ShieldCheck } from "lucide-react";
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

  return (
    <>
      {/* Subtle Pre-Footer Educational Ad Placement */}
      <EducationalAd variant="footer" />

      {/* Humorous Educational Quote Strip */}
      <div className="bg-[#0e0e12] border-t border-[#1a1a20] py-3 text-center px-4">
        <p className="text-[11px] sm:text-xs text-[#a0a0aa] font-medium flex items-center justify-center space-x-2">
          <Sparkles size={13} className="text-[#ff9900]" />
          <span>Less scrolling through nonsense. More scrolling through knowledge.</span>
          <span className="hidden md:inline text-gray-500">•</span>
          <span className="hidden md:inline text-gray-300 font-semibold">
            We take learning seriously. Ourselves? Not so much.
          </span>
        </p>
      </div>

      <footer className="bg-[#070709] border-t border-[#18181f] text-xs text-gray-400 pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9">
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
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Privacy Notice
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    DMCA Fair Use
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    2257 Educational Exemption
                  </button>
                </li>
                <li>
                  <span
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline cursor-pointer"
                  >
                    EU DSA
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline cursor-pointer"
                  >
                    Recommender System Guidelines
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline cursor-pointer"
                  >
                    Cookie Notice
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline cursor-pointer"
                  >
                    Accessibility
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline cursor-pointer"
                  >
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
                  <Link href="/categories" className="text-[#ff9900] hover:underline">
                    Content Partners
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Advertise
                  </button>
                </li>
                <li>
                  <Link href="/collections" className="text-[#ff9900] hover:underline">
                    Webmasters
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Educator & Professor Program
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Press
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Support and Help */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#e0e0e0]">Support and Help</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Content Removal
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Contact Support
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Trust and Academic Safety
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Parental Controls
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Manage Cookies
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Discover */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#e0e0e0]">Discover</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/search?q=Python" className="text-[#ff9900] hover:underline">
                    MentroHub Blog
                  </Link>
                </li>
                <li>
                  <Link href="/search?q=Calculus" className="text-[#ff9900] hover:underline">
                    Insights Blog
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="text-[#ff9900] hover:underline">
                    Intellectual Wellness Center
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-[#ff9900] hover:underline">
                    Mobile
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Visually Impaired
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setNoticeModalOpen(true)}
                    className="text-[#ff9900] hover:underline text-left"
                  >
                    Audio Impaired
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Language Selector Row (Exact Match to Screenshot 1 with working dropdown) */}
          <div className="max-w-5xl mx-auto flex items-center space-x-2 text-xs pt-4 relative" ref={langRef}>
            <span className="text-gray-400 font-semibold">Language:</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 bg-[#16161a] hover:bg-[#202026] text-white px-3 py-1.5 rounded-sm border border-[#24242e] transition-colors"
              >
                <Globe size={13} className="text-gray-400" />
                <span className="font-bold text-xs">{selectedLang}</span>
                <ChevronDown size={12} className="text-gray-400 ml-1" />
              </button>

              {langDropdownOpen && (
                <div className="absolute left-0 bottom-full mb-1 w-36 bg-[#16161a] border border-[#282834] rounded-sm shadow-2xl py-1 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang.name);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-200 hover:bg-[#ff9900] hover:text-black flex items-center justify-between transition-colors font-semibold"
                    >
                      <span>{lang.name}</span>
                      {selectedLang === lang.name && <Check size={13} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Bar: Social Icons, Copyright, RTE Badge & Notice to Users */}
          <div className="max-w-5xl mx-auto pt-6 border-t border-[#16161c] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social Icons (X and Discord) */}
            <div className="flex items-center space-x-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#18181e] hover:bg-[#ff9900] hover:text-black text-gray-300 flex items-center justify-center font-bold text-xs transition-colors"
                title="X / Twitter"
              >
                𝕏
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#18181e] hover:bg-[#ff9900] hover:text-black text-gray-300 flex items-center justify-center font-bold text-xs transition-colors"
                title="Discord"
              >
                💬
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center sm:text-right text-[#6e6e76] text-xs">
              © MentroHub.com, 2026. Unlimited Knowledge. Zero Regrets.
            </div>

            {/* Badges & Notice to Users button (Exact Match to Screenshot 1) */}
            <div className="flex items-center space-x-4">
              {/* Parody RTE Badge */}
              <div
                className="border border-white/20 px-2 py-0.5 rounded-sm font-black text-xs text-white tracking-widest bg-black cursor-help"
                title="Restricted To Education (RTE) — 100% SFW Educational Material Only"
              >
                RTE®
              </div>

              {/* Notice to Users Button */}
              <button
                type="button"
                onClick={() => setNoticeModalOpen(true)}
                className="bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs px-4 py-2 rounded-sm transition-colors text-center uppercase tracking-wider shadow-sm"
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

            <div className="flex items-center space-x-2 text-[#ff9900] text-xs font-black uppercase tracking-wider">
              <ShieldCheck size={16} />
              <span>Official MentroHub Educational Statement</span>
            </div>

            <h3 className="text-xl font-black text-white">
              Notice to Lifelong Learners & Visitors
            </h3>

            <div className="space-y-3 text-xs text-gray-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
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
                <span className="text-[#ff9900] font-bold">RTE® Certification:</span> Restricted To Education. Guaranteed 0% illicit content, 100% intellectual enrichment.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setNoticeModalOpen(false)}
                className="px-5 py-2 bg-[#ff9900] hover:bg-[#e68a00] text-black font-black text-xs rounded-sm transition-colors uppercase tracking-wider"
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
