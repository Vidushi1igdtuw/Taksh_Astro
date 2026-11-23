"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldAlert,
  Users,
  CreditCard,
  MessageSquare,
  Sparkles,
  Trash2,
  CheckCircle2,
  Crown,
  Search,
  Loader2,
} from "lucide-react";

export default function AdminPage() {
  const { user, login } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  // Quick admin login state if not logged in
  const [adminEmail, setAdminEmail] = useState("admin@astroverse.com");
  const [adminPass, setAdminPass] = useState("admin123");
  const [loginLoading, setLoginLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (res.ok) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const res = await login(adminEmail, adminPass);
    setLoginLoading(false);
    if (res.success) {
      fetchStats();
    }
  };

  const handleUpdateUser = async (userId: string, role?: string, tier?: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role, tier }),
      });
      if (res.ok) {
        setActionMsg("User successfully updated");
        fetchStats();
        setTimeout(() => setActionMsg(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to permanently delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setActionMsg("User successfully deleted");
        fetchStats();
        setTimeout(() => setActionMsg(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="py-16 max-w-md mx-auto px-4">
        <div className="p-8 rounded-2xl glass-panel border border-amber-500/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Admin Authentication Required</h2>
          <p className="text-xs text-slate-400">
            Please log in with the administrator credentials to access system analytics, user management, and AI monitoring.
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-3 text-left pt-2">
            <div>
              <label className="text-[11px] text-slate-300 font-medium block mb-1">Admin Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-300 font-medium block mb-1">Password</label>
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                required
                className="w-full bg-cosmic-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-cosmic-950 shadow-md transition-all hover:scale-[1.02]"
            >
              {loginLoading ? "Authenticating..." : "Sign In to Admin Console"}
            </button>
          </form>

          <div className="p-2.5 rounded-lg bg-cosmic-900/60 border border-white/5 text-[11px] text-slate-400">
            Pre-seeded Admin credentials: <span className="text-amber-300">admin@astroverse.com</span> /{" "}
            <span className="text-amber-300">admin123</span>
          </div>
        </div>
      </div>
    );
  }

  const filteredUsers = (stats?.users || []).filter(
    (u: any) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Control Console</h1>
          </div>
          <p className="text-xs text-slate-400">
            Platform telemetry, user authorization tiers, and AI query monitoring.
          </p>
        </div>

        {actionMsg && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold animate-in fade-in">
            {actionMsg}
          </div>
        )}
      </div>

      {loading ? (
        <div className="p-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
        </div>
      ) : stats ? (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl glass-card border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Total Users</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-3xl font-black text-white">{stats.totalUsers}</span>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Active Subs</span>
                <Crown className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-3xl font-black text-purple-300">{stats.activeSubscriptions}</span>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Total Revenue</span>
                <CreditCard className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-3xl font-black text-emerald-400">₹{stats.totalRevenue}</span>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">AI Consultations</span>
                <MessageSquare className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-3xl font-black text-amber-300">{stats.totalAiQueries}</span>
            </div>
          </div>

          {/* User Management Section */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white">Registered Users Directory</h2>
                <p className="text-xs text-slate-400">Manage user roles, subscription tiers, and access privileges.</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search user name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-cosmic-950 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-cosmic-900/80 text-amber-300 uppercase tracking-wider text-[11px] border-b border-white/10">
                  <tr>
                    <th className="px-4 py-3 font-semibold">User</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Tier</th>
                    <th className="px-4 py-3 font-semibold">Registered</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((u: any) => (
                    <tr key={u.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-bold text-white block">{u.name}</span>
                        <span className="text-[11px] text-slate-400">{u.email}</span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={u.role}
                          onChange={(e) => handleUpdateUser(u.id, e.target.value, undefined)}
                          className="bg-cosmic-950 border border-white/10 rounded-lg p-1 text-[11px] text-slate-200"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={u.tier}
                          onChange={(e) => handleUpdateUser(u.id, undefined, e.target.value)}
                          className="bg-cosmic-950 border border-white/10 rounded-lg p-1 text-[11px] text-slate-200 font-semibold"
                        >
                          <option value="free">Free</option>
                          <option value="pro">Pro</option>
                          <option value="premium">Premium</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                        {u.createdAt.split("T")[0]}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {u.email !== "admin@astroverse.com" && (
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subscriptions History */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 shadow-xl space-y-3">
            <h2 className="text-base font-bold text-white">Recent Subscription Transactions</h2>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-cosmic-900/80 text-amber-300 uppercase tracking-wider text-[11px] border-b border-white/10">
                  <tr>
                    <th className="px-4 py-2.5">Sub ID</th>
                    <th className="px-4 py-2.5">User ID</th>
                    <th className="px-4 py-2.5">Plan</th>
                    <th className="px-4 py-2.5">Amount</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th className="px-4 py-2.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats.subscriptions.map((s: any) => (
                    <tr key={s.id} className="hover:bg-white/5">
                      <td className="px-4 py-2.5 font-mono text-[11px] text-slate-400">{s.id}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-slate-300">{s.userId}</td>
                      <td className="px-4 py-2.5 font-bold uppercase text-amber-300">{s.planId}</td>
                      <td className="px-4 py-2.5 font-bold text-white">₹{s.amount}</td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-400">{s.startDate.split("T")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
