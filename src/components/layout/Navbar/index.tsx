"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthContext";
import Searchbar from "./Searchbar";
import CategoryNav from "./CategoryNav";
import {
  Menu,
  X,
  History,
  Bookmark,
  Layers,
  ShieldAlert,
  LogOut,
  User as UserIcon,
  BookOpen,
  FolderTree,
} from "lucide-react";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0e0e11] border-b border-[#24242c] shadow-md">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 shrink-0">
            <Link href="/" className="flex items-center group">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-gray-100 transition-colors">
                Mentro
              </span>
              <span className="bg-[#ff9900] text-black font-black text-sm sm:text-base px-2 py-0.5 rounded ml-1 tracking-wider shadow-sm uppercase">
                HUB
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-2 justify-center">
            <Searchbar />
          </div>

          {/* Navigation Links & User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/categories"
              className="text-xs font-semibold text-gray-300 hover:text-[#ff9900] transition-colors flex items-center"
            >
              <FolderTree size={14} className="mr-1 text-gray-400" />
              Categories
            </Link>

            <Link
              href="/collections"
              className="text-xs font-semibold text-gray-300 hover:text-[#ff9900] transition-colors flex items-center"
            >
              <Layers size={14} className="mr-1 text-gray-400" />
              Collections
            </Link>

            <Link
              href="/dashboard?tab=history"
              className="text-xs font-semibold text-gray-300 hover:text-[#ff9900] transition-colors flex items-center"
            >
              <History size={14} className="mr-1 text-gray-400" />
              History
            </Link>

            <Link
              href="/dashboard?tab=saved"
              className="text-xs font-semibold text-gray-300 hover:text-[#ff9900] transition-colors flex items-center"
            >
              <Bookmark size={14} className="mr-1 text-gray-400" />
              Saved
            </Link>

            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="bg-[#24242e] hover:bg-[#ff9900] hover:text-black text-[#ff9900] text-xs font-bold px-2.5 py-1 rounded transition-colors flex items-center border border-[#ff9900]/30"
              >
                <ShieldAlert size={13} className="mr-1" />
                Admin
              </Link>
            )}

            {/* User Dropdown / Auth Buttons */}
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-[#202026] animate-pulse" />
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-[#ff9900] transition-all"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#3a3a46]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#ff9900] text-black font-bold text-xs flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#18181d] border border-[#2b2b36] rounded-lg shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-[#252530]">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-[#2a2a34] text-[#ff9900]">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-[#252530] hover:text-[#ff9900]"
                      >
                        <BookOpen size={14} className="mr-2" />
                        Learning Hub
                      </Link>
                      <Link
                        href="/dashboard?tab=saved"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-[#252530] hover:text-[#ff9900]"
                      >
                        <Bookmark size={14} className="mr-2" />
                        Saved Lessons
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-xs text-gray-300 hover:bg-[#252530] hover:text-[#ff9900]"
                      >
                        <UserIcon size={14} className="mr-2" />
                        Profile Settings
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-xs text-[#ff9900] hover:bg-[#252530]"
                        >
                          <ShieldAlert size={14} className="mr-2" />
                          Admin Console
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-[#252530] pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left flex items-center px-4 py-2 text-xs text-red-400 hover:bg-[#252530]"
                      >
                        <LogOut size={14} className="mr-2" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-xs font-bold text-gray-200 hover:text-white px-3 py-1.5 rounded transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-[#ff9900] hover:bg-[#e68a00] text-black text-xs font-black px-3.5 py-1.5 rounded transition-colors shadow"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            {!user && (
              <Link
                href="/login"
                className="bg-[#ff9900] text-black text-xs font-bold px-2.5 py-1 rounded"
              >
                Log In
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <Searchbar />
        </div>
      </div>

      {/* Category Sub-Nav wrapped in Suspense for Next.js prerendering */}
      <Suspense fallback={<div className="h-9 bg-[#121215]" />}>
        <CategoryNav />
      </Suspense>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141418] border-b border-[#252530] px-4 py-3 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {user && (
            <div className="pb-2 border-b border-[#22222a] flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#24242c] text-[#ff9900]">
                {user.role}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#1c1c22] text-gray-200 hover:text-[#ff9900]"
            >
              Home
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#1c1c22] text-gray-200 hover:text-[#ff9900]"
            >
              Categories
            </Link>
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#1c1c22] text-gray-200 hover:text-[#ff9900]"
            >
              Collections
            </Link>
            <Link
              href="/dashboard?tab=history"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#1c1c22] text-gray-200 hover:text-[#ff9900]"
            >
              Watch History
            </Link>
            <Link
              href="/dashboard?tab=saved"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#1c1c22] text-gray-200 hover:text-[#ff9900]"
            >
              Saved Lessons
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#1c1c22] text-gray-200 hover:text-[#ff9900]"
            >
              Learning Hub
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="col-span-2 p-2 rounded bg-[#ff9900]/10 border border-[#ff9900]/30 text-[#ff9900] text-center"
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          <div className="pt-2 border-t border-[#22222a] flex justify-between items-center">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="text-xs text-red-400 font-semibold"
              >
                Log Out
              </button>
            ) : (
              <div className="flex space-x-2 w-full">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-[#22222a] text-white text-xs font-bold rounded"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-[#ff9900] text-black text-xs font-black rounded"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
