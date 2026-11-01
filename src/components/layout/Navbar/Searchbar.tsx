"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "Python for Beginners",
  "Vectors & Linear Algebra",
  "Essence of Calculus",
  "Deep Neural Networks",
  "100 Computer Science Concepts",
  "Relational SQL Queries",
  "Git Branching & Merging",
  "Docker in 100 Seconds",
  "Collatz Conjecture",
  "Microsoft Excel Tricks",
  "Personal Finance 101",
];

export default function Searchbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search lessons, algorithms, topics..."
          className="w-full bg-[#18181d] text-gray-100 placeholder-gray-500 text-sm rounded-full pl-10 pr-16 py-2 border border-[#2a2a34] focus:outline-none focus:border-[#ff9900] transition-colors"
        />

        <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-10 text-gray-500 hover:text-gray-300 p-1"
          >
            <X size={14} />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 px-3 bg-[#ff9900] hover:bg-[#e68a00] text-black font-bold text-xs rounded-full transition-colors flex items-center justify-center"
        >
          Go
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#18181d] border border-[#2e2e3a] rounded-lg shadow-2xl overflow-hidden z-50">
          <div className="p-2 border-b border-[#252530] text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center">
              <Sparkles size={12} className="mr-1 text-[#ff9900]" />
              Popular Searches
            </span>
          </div>

          <ul className="py-1">
            {(query ? filteredSuggestions : SUGGESTIONS.slice(0, 6)).map((item, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  className="w-full text-left px-3.5 py-2 text-xs text-gray-200 hover:bg-[#252530] hover:text-[#ff9900] flex items-center space-x-2 transition-colors"
                >
                  <Search size={13} className="text-gray-500" />
                  <span>{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
