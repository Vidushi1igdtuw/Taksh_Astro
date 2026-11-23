"use client";

import React, { useState, useRef, useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  Send,
  Trash2,
  Loader2,
  Clock,
  Heart,
  Briefcase,
  ShieldAlert,
  Compass,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export default function AIAstrologerPage() {
  const { user, activeKundli } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Namaste${
        user?.name ? " " + user.name : ""
      }! 🙏 I am your Astroverse AI Jyotish Acharya.
I have access to your birth chart coordinates, planetary degrees, active Dasha periods, and astrological houses.

Ask me anything about your career path, marriage and relationship timing, 7th house indicators, current Vimshottari Mahadasha, or suitable Vedic gemstones and mantras!`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    { text: "What does my 10th house say about my career?", icon: Briefcase },
    { text: "When are my chances of getting a job or promotion?", icon: Clock },
    { text: "What does my 7th house indicate about marriage & partner?", icon: Heart },
    { text: "What does my current Mahadasha indicate for this year?", icon: Sparkles },
    { text: "Are there any Doshas (Mangal, Kaal Sarp) in my chart?", icon: ShieldAlert },
    { text: "Which gemstones and mantras are recommended for me?", icon: Compass },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}_u`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-astrologer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          kundli: activeKundli,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to receive consultation");
      }

      const botMsg: Message = {
        id: `msg_${Date.now()}_a`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now()}_err`,
          role: "assistant",
          content:
            "I apologize, but a momentary cosmic interference occurred. Please try asking again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "fresh_start",
        role: "assistant",
        content: "Namaste! New conversation started. How may the planetary wisdom assist your journey today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <AuthGuard
      featureName="AI Vedic Astrologer"
      description="Consult with our context-aware AI Jyotish Acharya, powered by your personal planetary placements and Dasha cycles."
    >
      <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-cosmic-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h1 className="text-base font-bold text-white flex items-center gap-2">
                <span>Astroverse AI Astrologer</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Context-Aware Jyotish
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                {activeKundli ? (
                  <span className="text-amber-300">
                    Active Chart: {activeKundli.birthDetails.name} ({activeKundli.lagna.signName} Lagna •{" "}
                    {activeKundli.moonSign.signName} Moon)
                  </span>
                ) : (
                  <span>Using your saved astrological profile to tailor readings.</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Clear Chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="rounded-2xl glass-panel border border-amber-500/30 shadow-2xl flex flex-col h-[650px] overflow-hidden">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-amber-400 p-0.5 shrink-0 shadow-md">
                      <div className="w-full h-full bg-cosmic-950 rounded-full flex items-center justify-center text-xs text-amber-300">
                        ॐ
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? "bg-amber-400 text-cosmic-950 font-medium rounded-tr-none shadow-lg shadow-amber-500/10"
                        : "glass-card text-slate-200 rounded-tl-none border border-white/10"
                    }`}
                  >
                    <div className="whitespace-pre-line">{m.content}</div>
                    <span
                      className={`block text-[9px] mt-2 text-right ${
                        isUser ? "text-cosmic-950/70" : "text-slate-400"
                      }`}
                    >
                      {new Date(m.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {user?.name ? user.name.charAt(0) : "U"}
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-amber-400 p-0.5 shrink-0 shadow-md">
                  <div className="w-full h-full bg-cosmic-950 rounded-full flex items-center justify-center text-xs text-amber-300">
                    ॐ
                  </div>
                </div>
                <div className="glass-card rounded-2xl rounded-tl-none p-3.5 text-xs text-amber-300 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Reading natal houses and consulting planetary ephemeris...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Question Chips */}
          <div className="px-4 py-2 border-t border-white/10 bg-cosmic-950/50 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {suggestedQuestions.map((q) => {
              const Icon = q.icon;
              return (
                <button
                  key={q.text}
                  onClick={() => handleSend(q.text)}
                  disabled={loading}
                  className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium glass-panel border border-amber-500/20 text-slate-300 hover:text-amber-300 hover:border-amber-400/50 hover:bg-amber-400/5 transition-all shrink-0"
                >
                  <Icon className="w-3 h-3 text-amber-400" />
                  <span>{q.text}</span>
                </button>
              );
            })}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-white/10 bg-cosmic-950">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your career, marriage, dasha, or remedies..."
                disabled={loading}
                className="flex-1 bg-cosmic-900 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-cosmic-950 font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
