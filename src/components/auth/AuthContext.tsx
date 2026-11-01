"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@/types";
import { getStoredUser, setStoredUser, demoLogin, customLogin } from "@/lib/client-store";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const stored = getStoredUser();
    setUser(stored);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string) => {
    if (email.toLowerCase().includes("admin")) {
      const logged = demoLogin("admin");
      setUser(logged);
      return { success: true };
    }
    const logged = customLogin(email);
    setUser(logged);
    return { success: true };
  };

  const register = async (name: string, email: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      email,
      name,
      role: "student",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      bio: "Lifelong learner on MentroHub.",
      createdAt: new Date().toISOString(),
    };
    setStoredUser(newUser);
    setUser(newUser);
    return { success: true };
  };

  const logout = async () => {
    setStoredUser(null);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
