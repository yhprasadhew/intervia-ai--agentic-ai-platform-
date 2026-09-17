import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiLogOut,
  FiAward,
  FiPlay,
  FiCheckCircle,
  FiUser,
  FiShield,
  FiCpu,
  FiLayers,
  FiCode,
  FiMessageSquare,
} from "react-icons/fi";
import { auth, signOut } from "../configs/firebase.js";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const initUser = async () => {
      // 1. Try reading from localStorage first
      const stored = localStorage.getItem("intervia_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse stored user", e);
        }
      }

      // 2. Validate session with backend /auth/me
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser((prev) => ({
              ...prev,
              ...data.user,
            }));
            localStorage.setItem(
              "intervia_user",
              JSON.stringify({
                ...JSON.parse(stored || "{}"),
                ...data.user,
              })
            );
          }
        }
      } catch (err) {
        // Backend offline or no session cookie yet
        console.warn("Session check fallback:", err.message);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, [API_BASE_URL]);

  const handleLogout = async () => {
    try {
      // 1. Backend logout to clear session cookie & Redis entry
      await fetch(`${API_BASE_URL}/auth/logout`, {
        credentials: "include",
      });
    } catch (e) {
      console.warn("Backend logout error:", e);
    }

    try {
      // 2. Firebase sign out
      await signOut(auth);
    } catch (e) {
      console.warn("Firebase signout error:", e);
    }

    // 3. Clear local storage & navigate
    localStorage.removeItem("intervia_user");
    setUser(null);
    navigate("/login");
  };

  const tracks = [
    {
      title: "Backend & Distributed Systems",
      agent: "Agent Marcus",
      role: "Staff Infrastructure Engineer",
      duration: "45 mins",
      difficulty: "Senior / Staff",
      icon: <FiCpu className="w-5 h-5 text-[#2F5D50]" />,
    },
    {
      title: "System Design & Architecture",
      agent: "Agent Elena",
      role: "Principal Solutions Architect",
      duration: "60 mins",
      difficulty: "Staff / Principal",
      icon: <FiLayers className="w-5 h-5 text-[#2F5D50]" />,
    },
    {
      title: "Data Structures & Problem Solving",
      agent: "Agent Alex",
      role: "Senior Algorithms Specialist",
      duration: "45 mins",
      difficulty: "L4 / L5 Intermediate",
      icon: <FiCode className="w-5 h-5 text-[#2F5D50]" />,
    },
    {
      title: "Behavioral & Cross-Functional",
      agent: "Agent Sarah",
      role: "Engineering Director",
      duration: "30 mins",
      difficulty: "All Levels",
      icon: <FiMessageSquare className="w-5 h-5 text-[#2F5D50]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#1C1B19] font-sans selection:bg-[#2F5D50] selection:text-white flex flex-col justify-between">
      {/* ================= TOP NAVIGATION ================= */}
      <header className="sticky top-0 z-40 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#1C1B19]/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-sm bg-[#2F5D50] flex items-center justify-center text-white text-sm font-mono font-medium shadow-sm transition-transform group-hover:scale-105">
                iv
              </div>
              <span className="text-[17px] font-medium tracking-tight">
                Intervia <span className="text-[#2F5D50]">AI</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block font-mono text-[11px] px-2 py-0.5 rounded-sm bg-[#2F5D50]/10 text-[#2F5D50] font-medium border border-[#2F5D50]/20">
              CANDIDATE PORTAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-[13.5px] font-mono text-[#1C1B19]/60 hover:text-[#1C1B19] transition-colors"
            >
              <FiArrowLeft className="w-3.5 h-3.5" />
              <span>Landing Page</span>
            </Link>

            {user && (
              <div className="flex items-center gap-3 pl-3 border-l border-[#1C1B19]/10">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-full border border-[#1C1B19]/20 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#2F5D50] text-white flex items-center justify-center font-mono text-xs font-semibold">
                      {(user.name || user.email || "U").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-[13px] font-medium leading-none">
                      {user.name || "Candidate"}
                    </span>
                    <span className="text-[11px] font-mono text-[#1C1B19]/50 leading-tight">
                      {user.email}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Sign out"
                  className="px-3 py-1.5 rounded-sm border border-[#1C1B19]/15 text-[12.5px] font-mono text-[#1C1B19]/70 hover:text-red-700 hover:border-red-300 hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FiLogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= DASHBOARD MAIN ================= */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 md:py-10 w-full space-y-8">
        {/* Welcome Section */}
        <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#2F5D50]/10 text-[#2F5D50] font-mono text-[11px] font-medium mb-3">
              <FiShield className="w-3.5 h-3.5" />
              <span>ACTIVE SESSION VERIFIED</span>
            </div>
            <h1 className="font-serif text-[28px] sm:text-[34px] font-medium tracking-tight text-[#1C1B19] leading-tight">
              Welcome back, {user?.name || "Candidate"}
            </h1>
            <p className="mt-1.5 text-[14.5px] text-[#1C1B19]/65 max-w-xl">
              Your AI interview tracks are calibrated to tier-1 standards. Pick a focus area to start a simulation or review your scorecard.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-sm border border-[#1C1B19]/15 text-[13.5px] font-mono hover:bg-[#FAF9F5] transition-colors text-center flex-1 md:flex-none"
            >
              Account Settings
            </Link>
            <a
              href="#tracks"
              className="px-5 py-2.5 rounded-sm bg-[#2F5D50] hover:bg-[#254a40] text-white text-[13.5px] font-medium transition-colors shadow-sm flex items-center justify-center gap-2 flex-1 md:flex-none"
            >
              <FiPlay className="w-4 h-4" />
              <span>Start Practice</span>
            </a>
          </div>
        </div>

        {/* Stats Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-[#1C1B19]/60 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider">Interview Coins</span>
              <FiAward className="w-4 h-4 text-[#2F5D50]" />
            </div>
            <p className="font-serif text-[32px] font-medium text-[#1C1B19]">
              {user?.interviewCoins ?? 150}
            </p>
            <p className="text-[12px] font-mono text-[#2F5D50] mt-1">
              +50 coins bonus active
            </p>
          </div>

          <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-[#1C1B19]/60 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider">Simulations Done</span>
              <FiCheckCircle className="w-4 h-4 text-[#2F5D50]" />
            </div>
            <p className="font-serif text-[32px] font-medium text-[#1C1B19]">0</p>
            <p className="text-[12px] font-mono text-[#1C1B19]/50 mt-1">
              Ready for your first session
            </p>
          </div>

          <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-[#1C1B19]/60 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider">Readiness Score</span>
              <span className="text-[11px] font-mono text-[#2F5D50]">Target: 95%</span>
            </div>
            <p className="font-serif text-[32px] font-medium text-[#1C1B19]">--%</p>
            <p className="text-[12px] font-mono text-[#1C1B19]/50 mt-1">
              Unlocked after 1 mock
            </p>
          </div>

          <div className="bg-white border border-[#1C1B19]/10 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-[#1C1B19]/60 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider">Target Level</span>
              <FiUser className="w-4 h-4 text-[#2F5D50]" />
            </div>
            <p className="font-serif text-[24px] font-medium text-[#1C1B19] truncate">
              Senior / Staff
            </p>
            <p className="text-[12px] font-mono text-[#1C1B19]/50 mt-1">
              Level 5/6 Calibration
            </p>
          </div>
        </div>

        {/* Practice Tracks Section */}
        <section id="tracks" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-[22px] font-medium text-[#1C1B19]">
                Available AI Interview Tracks
              </h2>
              <p className="text-[13.5px] text-[#1C1B19]/60">
                Voice-interactive simulations powered by specialized reasoning agents.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.map((track, i) => (
              <div
                key={i}
                className="bg-white border border-[#1C1B19]/10 rounded-xl p-6 shadow-sm hover:border-[#2F5D50]/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-sm bg-[#F7F5F0] border border-[#1C1B19]/10 group-hover:border-[#2F5D50]/30 transition-colors">
                      {track.icon}
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm bg-[#F7F5F0] text-[#1C1B19]/70 border border-[#1C1B19]/10">
                      {track.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-[18px] font-medium text-[#1C1B19]">
                      {track.title}
                    </h3>
                    <p className="text-[12.5px] font-mono text-[#2F5D50] mt-0.5">
                      {track.agent} • {track.role}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1C1B19]/10 flex items-center justify-between">
                  <span className="font-mono text-[11.5px] text-[#1C1B19]/60">
                    Difficulty: <strong className="text-[#1C1B19]">{track.difficulty}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        `Starting simulation session for "${track.title}" with ${track.agent}. Microphones & audio will be connected.`
                      )
                    }
                    className="px-3.5 py-1.5 rounded-sm bg-[#1C1B19] hover:bg-[#2F5D50] text-white text-[12.5px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Launch</span>
                    <FiPlay className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="px-6 py-5 border-t border-[#1C1B19]/10 text-center font-mono text-[11.5px] text-[#1C1B19]/50 bg-white/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Intervia AI. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-[#1C1B19] transition-colors">
              Platform Overview
            </Link>
            <Link to="/login" className="hover:text-[#1C1B19] transition-colors">
              Candidate Security
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;