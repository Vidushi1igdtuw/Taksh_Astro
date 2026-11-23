"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { KundliData } from "@/lib/astronomy/ephemeris";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  tier: "free" | "pro" | "premium";
}

export interface SavedProfile {
  id: string;
  name: string;
  birthDate: string;
  birthTime: string;
  place: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number;
  chartData?: KundliData;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  activeKundli: KundliData | null;
  setActiveKundli: (k: KundliData | null) => void;
  savedProfiles: SavedProfile[];
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeKundli, setActiveKundli] = useState<KundliData | null>(null);
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setSavedProfiles(data.profiles || []);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data.user);
      setToken(data.token);
      await refreshUser();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      setUser(data.user);
      setToken(data.token);
      await refreshUser();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const logout = () => {
    document.cookie = "astro_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setUser(null);
    setToken(null);
    setSavedProfiles([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        activeKundli,
        setActiveKundli,
        savedProfiles,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
